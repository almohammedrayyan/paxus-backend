/*************************************************
 * SmartMeet microservices - Admin
 * apiMessage.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// const values
const apiMessage = {
  welcomeMessage: "Welcome to Paxus microservices - user",
  404: "404, Page not found!",
  somethingWentWrong: "Something went wrong",
  accountNotSupported: "Free Zoom accounts aren’t supported",
  invalidZoomEmail: "Invalid email. Zoom account verification failed.",
  invalidZoomData: "Invalid crediential.",

  success: "success",
  emailDuplicate: "Email already exist",
  organizationName: "Organization name already exist",
  organizationAbbreviation: "Display name already exist",

  organizationBoth: "Organization name and Display name already exist",
  organizationThree:
    "Organization name and Display name and email already exist",

  roleDeptDuplicate: "Role and Department already exist",
  accountNameAndaccountIdAndEmailDuplicate:
    "AccountName or AccountId or Email already exist",
  dataDuplicate:
    "AccountName or AccountId or Email or clientId or clientSecret is already exist",
  dataMissing: "Missing required fields",
  emailExists: "Email Id Already exist",
};

// exports
export { apiMessage };
