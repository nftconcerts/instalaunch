const functions = require("firebase-functions");
const express = require("express");

const app = express();
app.get("/timestamp", (req, res) => {
  res.send(`${Date.now()}`);
});

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.helloWorld = functions.https.onRequest(app);
