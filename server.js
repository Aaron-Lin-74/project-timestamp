// server.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.get('/api/:date?', function (req, res) {
  const { date } = req.params
  // Check if date parameter is empty
  if (date) {
    // Test the date is valid or not
    if (
      new Date(date) == 'Invalid Date' &&
      new Date(Number(date)) == 'Invalid Date'
    ) {
      return res.status(200).json({ error: 'Invalid Date' })
    }

    // Date is in unix type
    if (Number(date)) {
      let unix = new Date(Number(date)).getTime()
      let utc = new Date(Number(date)).toUTCString()
      return res.status(200).json({ unix, utc })
    }
    let unix = new Date(date).getTime()
    let utc = new Date(date).toUTCString()
    return res.status(200).json({ unix, utc })
  }
  res.json({ unix: Date.now(), utc: new Date().toUTCString() })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
