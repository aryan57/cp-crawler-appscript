Competitive Programming Crawler
==========
 `Competitive Programming Crawler` is a tool which will crawl all your codes from websites [codeforces](https://codeforces.com/), [codechef](https://www.codechef.com/) and [atcoder](https://atcoder.jp/) using web scraping and automatically downloads the solution codes.
 
 Installation
----------
  - Go to https://script.google.com
  - Make a new project
  - Copy paste all the script files in the project
  - Get a github api token from https://github.com/settings/tokens and save as GITHUB_TOKEN
  - Make a new Google spreadsheet and save it sheet id as DB_SPREADSHEET_ID
  - Make 3 sheets within the spreadsheet as "Codeforces","Codechef","Atcoder". (Not Sheet1,Sheet2)
  - Set your GITHUB_USER_ID,GITHUB_REPO_NAME,CODEFORCES_HANDLE
  - Save the project and make a time based trigger to run the script every 15 mins (or whatever you like).
  
