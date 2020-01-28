
const express = require("express");
const app = express();
const bot = require('./index.js')

app.get("/", function(request, response) {
  response.send("OK boomer")
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
