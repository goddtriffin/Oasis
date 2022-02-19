// express / socket.io
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const axios = require('axios');

// clients
const clients = require("./clients");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// allow access to everything in these folders
app.use(express.static("public"));

// home
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Plausible analytics
app.post("/api/v1/scitylana", function (req, res) {
    const headers = {
        "User-Agent": req.body.user_agent,
        "Content-Type": "application/json",
        "X-Forwarded-For": req.ip,
    }

    const body = {
        "domain": "oasis.toddgriffin.me",
        "name": "pageview",
        "url": req.body.url,
        "referrer": req.body.referrer,
        "screen_width": req.body.screen_width,
    }

    if (process.env.NODE_ENV === "production") {
        axios.post("https://plausible.io/api/event", body, headers)
            .then(function (response) {
                console.log("Plausible Analytics:", response.status);
            })
            .catch(function (error) {
                console.log("Plausible Analytics:", error);
            });
    } else {
        console.log("Not sending Plausible analytics request due to being in development environment.");
        console.log("Plausible Analytics headers:", headers);
        console.log("Plausible Analytics body:", body);
    }

    // OK
    res.sendStatus(200);
})

// handle the connection of clients
clients.init(io);

// start server
var port = process.env.PORT || 8080;
http.listen(port, function () {
  console.log("Server listening on *:" + port + "!");
});
