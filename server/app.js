const Sentry = require("@sentry/node");
if (process.env.SENTRY_DSN === undefined || process.env.SENTRY_DSN === null || process.env.SENTRY_DSN === "") {
  console.error("SENTRY_DSN is not set. Exiting.");
  process.exit(1);
}
Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

require("log-timestamp");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");
const axios = require('axios');

// clients
const clients = require("./clients");
const res = require("express/lib/response");

// this allows the client's IP propogate to the request properly
app.set("trust proxy", true);

app.use(function (req, res, next) {
    console.log(req.method, req.originalUrl)
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// allow access to everything in these folders
app.use(express.static("public"));

// favicon.ico
app.get("/favicon.ico", function (req, res) {
    res.sendFile("public/res/favicon.ico", {"root": "./"});
})

// sitemap.xml
app.get("/sitemap.xml", function (req, res) {
    res.sendFile("public/res/sitemap.xml", {"root": "./"});
});

// robots.txt
app.get("/robots.txt", function (req, res) {
    res.sendFile("public/res/robots.txt", {"root": "./"});
});

// humans.txt
app.get("/humans.txt", function (req, res) {
    res.sendFile("public/res/humans.txt", {"root": "./"});
});

// PAGE: home
app.get("/", function (req, res) {
    res.sendFile("public/index.html", {"root": "./"});
});

// API: health
app.get("/api/v1/health", function (req, res) {
    res.sendStatus(200);
});

// API: Plausible Analytics
app.post("/api/v1/scitylana", function (req, res) {
    const domain = (process.env.NODE_ENV === "production")? "oasis.toddgriffin.me" : "test.toddgriffin.me";

    const headers = {
        "User-Agent": req.body.user_agent,
        "Content-Type": "application/json",
        "X-Forwarded-For": req.ip,
    }

    const body = {
        "domain": domain,
        "name": "pageview",
        "url": req.body.url,
        "referrer": req.body.referrer,
        "screen_width": req.body.screen_width,
    }

    console.log("Plausible Analytics headers:", headers);
    console.log("Plausible Analytics body:", body);

    axios.post("https://plausible.io/api/event", body, headers)
        .then(function (response) {
            console.log("Successfully sent Plausible Analytics call.");
        })
        .catch(function (error) {
            console.log("Failed Plausible Analytics call:", error);
        });

    // OK
    res.sendStatus(200);
});

// handle the connection of clients
clients.init(io);

// start server
var port = process.env.PORT || 8080;
http.listen(port, function () {
  console.log("Server listening on *:" + port + "!");
});
