enum ROLE {
  student = "student",
  institute = "institute",
  educator = "educator",
  publisher = "publisher",
  admin = "admin",
}

enum SERVER_TYPE {
  dev = "dev",
  qa = "qa",
  stage = "stage",
  prod = "prod",
}

enum DATE_FORMAT {
  format1 = "YYYY-MM-DD HH:mm:ss",
  format2 = "YYYY-MM-DD",
  format3 = "MMMM D, YYYY",
  format4 = "hh:mm A",
  format5 = "YYYY-MM-DD hh:mm A",
  format6 = "D MMMM, YYYY",
}

export { ROLE, SERVER_TYPE, DATE_FORMAT };
