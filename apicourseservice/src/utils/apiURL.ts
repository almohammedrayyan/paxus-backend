/*************************************************
 * SmartMeet microservices - Admin
 * apiURL.ts
 * Created by Mohammed Fuzail on 24/09/2026
 * Copyright
 *************************************************/

// URL's
const END_POINT = {
  create: "/create",
  getById: "/getById/:_id",
  update: "/update",
  delete: "/delete/:_id",
  getAll: "/get-all",
  applyCourse: "/apply-course/:id",
};

const INTERNAL_END_POINT = {
  sendEmail: "/api/queue/sendEmail",
  inActiveUser: "/api/meetings/inactiveUser",
  sendNotification: "/api/queue/sendNotification",
};

// exports
export { END_POINT, INTERNAL_END_POINT };
