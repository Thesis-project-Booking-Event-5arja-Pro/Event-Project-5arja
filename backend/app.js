const express = require("express");
const app = express();
const eventRoute = require("./routes/event");
const eventplanerRoute = require("./routes/admin");
const clientRoute = require("./routes/client");
const commentsRoute = require("./routes/comments");
const postRoute = require("./routes/post");
const feedbackRoute = require("./routes/feed back");
const ticketRoute = require("./routes/ticket");
const event_attendanceRoute = require("./routes/event_attendance");
const imageUploadRoute = require("./routes/uploadImage"); // Add this line
const cors = require("cors");



var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://kharja-26131-default-rtdb.europe-west1.firebasedatabase.app",
});

app.use(cors({ origin: "http://192.168.1.13:5000 ", credentials: true }));
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use("/api/event_attendance", event_attendanceRoute);
app.use("/api/event", eventRoute);
app.use("/api/eventplaner", eventplanerRoute);
app.use("/api/client", clientRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/post", postRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/ticket", ticketRoute);
app.use("/api/image-upload", imageUploadRoute);


module.exports = app;
