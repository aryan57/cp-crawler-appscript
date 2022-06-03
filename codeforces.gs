function codeforcesHandler() {

  const submissions_from_spreadsheet = get_submissions_in_spreadsheets("codeforces");
  // if there was some error in get_submissions_in_spreadsheets we returned null
  if(submissions_from_spreadsheet==null)return
  Logger.log("Fetching submissions from codeforces api.");

  let to_be_added = [[]]

  try {
    const url = "https://codeforces.com/api/user.status?handle=" + CODEFORCES_HANDLE
    +"&from=1&count="+CF_MAX_SUBMISSIONS;

    const response = JSON.parse(UrlFetchApp.fetch(url))["result"];

    for (let j = 0; j < response.length; j++) {
      if(response[j]["verdict"]!="OK")continue; // dont want non-accepted answers
      if(submissions_from_spreadsheet.indexOf(response[j]["id"].toString())!=-1)continue; // already in sheet-db

      const submission_url = "codeforces.com/contest/" +
                              response[j]["contestId"].toString() +
                              "/submission/" + response[j]["id"].toString();
      
      const contest_url = "codeforces.com/contest/" +
                              response[j]["contestId"].toString();

      let contest_name = getCodeforcesContestName(contest_url)
      if(contest_name==null)continue; //error in parsing contest name from crawler
      contest_name = remove_bad_chars(contest_name)

      const code_txt = getCodeforcesCodeText(submission_url)
      if(code_txt==null)continue; //error in parsing code text from crawler

      let problem_name = response[j]["problem"]["index"].toString() +
                          " - " + response[j]["problem"]["name"].toString();
      problem_name = remove_bad_chars(problem_name)

      const file_extension = (EXTENSION_MAPPING[response[j]["programmingLanguage"]]?EXTENSION_MAPPING[response[j]["programmingLanguage"]]:DEFAULT_EXTENSION);
      
      const file_name = problem_name+file_extension
      const base64Content = Utilities.base64Encode(code_txt)
      const github_url = 'https://api.github.com/repos/aryan57/cp-archive/contents/Codeforces-auto-uploads/'
                          +encodeURIComponent(contest_name)+"/"+encodeURIComponent(file_name)

      const data = {
        "message": time_now(),
        "content": base64Content
      };

      const config = {
          method: "put",
          headers: {
              "Authorization": "Bearer " + GITHUB_TOKEN,
              "Content-Type": "application/json"
          },
          payload: JSON.stringify(data)
      };

      try{
        UrlFetchApp.fetch(github_url,config)
        Logger.log("[Codeforces] successfully uploaded to github [  "+ file_name+" ]");
        to_be_added.push([response[j]["id"].toString()])
      }catch(e){
        // console.error(e.message);
      }
    }

  } catch (e) {
    console.error(e.message);
  }
  return to_be_added;
}

function getCodeforcesContestName(contest_url) {
  Logger.log("[Codeforces] [contest name :  "+ contest_url+" ]");
  let strDecoded = null;
  try {
    const htmlTextContent = UrlFetchApp.fetch(contest_url).getContentText()
    /*
      contest name will be inside this form:
      [some_string]<title> s1 - contestname(which can contain '-') - s2 </title>[some_string]
    */
    const fromText = '<title>';
    const toText = '</title>';
    let str = Parser.data(htmlTextContent).from(fromText).to(toText).build();
    str = str.split('-')
    str.shift()
    str.pop()
    str = str.join('-')
    str = str.trim()
    strDecoded = str
  } catch (e) {
    console.error(e.message);
    strDecoded=null;
  }
  if(strDecoded=="")strDecoded=null;
  
  return strDecoded;
}

function getCodeforcesCodeText(submissionURL) {
  Logger.log("[Codeforces] [code text :  "+ submissionURL+" ]");
  let strDecoded = null;
  try {
    const htmlTextContent = UrlFetchApp.fetch(submissionURL).getContentText()
    /*
      code will be in this form:
      [some_string]id="program-source-text"[some_string]>[some_code_string]<[some_string]
    */
    const fromText = 'id="program-source-text"';
    const toText = '<';
    let scraped = Parser.data(htmlTextContent).from(fromText).to(toText).build();

    for (let i = 0; i < scraped.length; i++) {
      if (scraped[i] == '>') {
        scraped = scraped.substring(i + 1);
        break;
      }
    }

    const decode = XmlService.parse('<d>' + scraped + '</d>');
    strDecoded = decode.getRootElement().getText()
  } catch (e) {
    console.error(e.message);
    strDecoded=null;
  }
  if(strDecoded=="")strDecoded=null;
  return strDecoded;
}
