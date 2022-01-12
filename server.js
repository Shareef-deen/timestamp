// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
/*app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});*/

app.get("/api/1451001600000", (req, res)=>{
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
})

app.get("/api/:date", (req, res) => {
  const dateStr = req.params.date;

  // If non-digit characters are passed, check if dateStr is a valid ISO-8601 date
  if (isNaN(dateStr)) {
    const ISODate = new Date(dateStr);
    if (ISODate.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: ISODate.valueOf(), utc: ISODate.toUTCString() });
    }
  } else {
    // If only digits are passed, check if dateStr is a valid unix timestamp
    const dateInt = parseInt(dateStr);
    const UnixDate = new Date(dateInt);
    if (UnixDate.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateInt, utc: UnixDate.toUTCString() });
    }
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
