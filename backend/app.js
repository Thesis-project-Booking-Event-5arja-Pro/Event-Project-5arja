const express = require("express");
const app = express();
const eventRoute = require("./routes/event");
const eventplanerRoute = require("./routes/admin");
const clientRoute = require("./routes/client");
const commentsRoute = require("./routes/comments");
const postRoute = require("./routes/post");
const likesRoute = require("./routes/likes");
const bookingRoute = require("./routes/booking");
const imageUploadRoute = require("./routes/uploadImage"); // Add this line
const cors = require("cors");



var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://kharja-26131-default-rtdb.europe-west1.firebasedatabase.app",
});

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use("/api/event", eventRoute);
app.use("/api/user", clientRoute);
app.use("/api/likes", likesRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/eventplaner", eventplanerRoute);

app.use("/api/comments", commentsRoute);
app.use("/api/post", postRoute);

app.use("/api/image-upload", imageUploadRoute);



module.exports = app;


