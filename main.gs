function main() {
  const new_cf_submissions = codeforcesHandler();
  add_new_submissions_in_spreadsheet("codeforces",new_cf_submissions)
}
