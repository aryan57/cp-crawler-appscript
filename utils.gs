/**
 * site_name : string
 * It is the name of the programming site
 * for which we want to get submission ids already
 * present in the spreadsheet
 */
function get_submissions_in_spreadsheets(site_name)
{
  Logger.log("Fetching "+site_name+" submissions already present in the spreadshhet.");
  let values = null
  try {
    values = Sheets.Spreadsheets.Values.get(DB_SPREADSHEET_ID, DB_SHEET_RANGE[site_name]).values;
  } catch(e) {
    console.error(e.message);
    return null;
  }
  
  if(values==null)values =[[]];
  
  let submissions_in_spreadsheet = [];
  for(let i=0;i<values.length;i++){
    if(values[i].length>0)submissions_in_spreadsheet.push(values[i][0]);
  }

  Logger.log("Fetched ["+submissions_in_spreadsheet.length+"] "+site_name+" submissions from spreadshhet.");
  return submissions_in_spreadsheet;
}

function add_new_submissions_in_spreadsheet(site_name,arr) // arr is 2D (Nx1)
{
  try{
    Logger.log("Adding new "+site_name+" submissions in Google Sheets.");

    let valueRange = Sheets.newRowData();
    valueRange.values = arr;

    let appendRequest = Sheets.newAppendCellsRequest();
    appendRequest.sheetId = DB_SPREADSHEET_ID;
    appendRequest.rows = [valueRange];

    const result = Sheets.Spreadsheets.Values.append(valueRange,
                    DB_SPREADSHEET_ID, DB_SHEET_RANGE[site_name],
                    {valueInputOption: "USER_ENTERED"});
    let num=0;
    if(result["updates"]["updatedCells"]!=undefined)
    {
      num=result["updates"]["updatedCells"];
    }
    Logger.log("Added ["+num+"] new submissions in Google Sheets");
  }catch(e){
    console.error("Error in add_new_submissions");
  }
  
}

function remove_bad_chars(str){
  const regex = /[\p{L}-]+|[0-9]+/gu;
  const words = str.match(regex);
  if (words === null) {
      return `${str.replace(/\W+/g, '_')}`;
  } else {
      return `${words.join('_')}`;
  }
}

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

function time_now(){
  let d = new Date();
  return [d.getFullYear(),
                (d.getMonth()+1).padLeft(),   
                d.getDate().padLeft()].join('-') +' ' +
                [d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()].join(':');
}
  
