const GITHUB_TOKEN = "";
const GITHUB_USER_ID = "aryan57"
const GITHUB_REPO_NAME = "cp-archive"


const GITHUB_CODEFORCES_FOLDER_PATH = 'https://api.github.com/repos/'+
                                        GITHUB_USER_ID + "/" +
                                        GITHUB_REPO_NAME + "/" +
                                        'contents/Codeforces-auto-uploads/'


const CODEFORCES_HANDLE = "aryan57";
const CODECHEF_HANDLE = "aryan57";
const ATCODER_HANDLE = "aryan57";

const DB_SPREADSHEET_ID = "";
const DB_SHEET_RANGE = {
  'codeforces' : 'Codeforces!A1:A',
  'codechef' : 'Codechef!A1:A',
  'atcoder' : 'Atcoder!A1:A'
};

const CF_MAX_SUBMISSIONS = 150; // assuming the user will make 
                            // atmax 150 submissions in the 15 mins trigger time

const DEFAULT_EXTENSION = ".cpp";
const EXTENSION_MAPPING = {
  'GNU C': '.c',
  'GNU C11': '.c',
  'Clang++17 Diagnostics': '.cpp',
  'GNU C++': '.cpp',
  'GNU C++11': '.cpp',
  'GNU C++14': '.cpp',
  'GNU C++17': '.cpp',
  'GNU C++17 Diagnostics': '.cpp',
  'GNU C++17 (64)' : '.cpp',
  'MS C++': '.cpp',
  'Mono C#': '.cs',
  'D': '.d',
  'Go': '.go',
  'Haskell': '.hs',
  'Java 8': '.java',
  'Kotlin': '.kt',
  'Ocaml': '.ml',
  'Delphi': '.dpr',
  'FPC': '.pas',
  'PascalABC.NET': '.pas',
  'Perl': '.pl',
  'PHP': '.php',
  'Python 2': '.py',
  'Python 3': '.py',
  'PyPy 2': '.py',
  'PyPy 3': '.py',
  'Ruby': '.rb',
  'Rust': '.rs',
  'Scala': '.scala',
  'JavaScript': '.js',
  'Node.js': '.js',
  'Q#': '.qs'
};
