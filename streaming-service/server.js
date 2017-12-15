'use strict';

////
// CONFIGURATION SETTINGS
////
var FETCH_INTERVAL = 5000;
var PRETTY_PRINT_JSON = true;

////
// START
////
var express = require('express');
var http = require('http');
var https = require('https');
var io = require('socket.io');
var cors = require('cors');

function getQuote(socket, ticker) {
  https.get(
    {
      port: 443,
      method: 'GET',
      hostname: 'www.google.com',
      path: '/finance/info?client=ig&q=' + ticker,
      timeout: 1000,
    },
    function(response) {
      response.setEncoding('utf8');
      var data = '';

      response.on('data', function(chunk) {
        data += chunk;
      });

      response.on('end', function() {
        if (data.length > 0) {
          var dataObj;

          try {
            dataObj = JSON.parse(data.substring(3));
          } catch (e) {
            return false;
          }

          var quote = {};
          quote.ticker = dataObj[0].t;
          quote.exchange = dataObj[0].e;
          quote.price = dataObj[0].l_cur;
          quote.change = dataObj[0].c;
          quote.change_percent = dataObj[0].cp;
          quote.last_trade_time = dataObj[0].lt;
          quote.dividend = dataObj[0].div;
          quote.yield = dataObj[0].yld;

          socket.emit(ticker, PRETTY_PRINT_JSON ? JSON.stringify(quote, null, 4) : JSON.stringify(quote));
        }
      });
    }
  );
}

function getRandomValBetween(min, max, precision) {
  min = min === undefined ? 0 : min;
  max = max === undefined ? 9007199254740992 : max;
  precision = precision === undefined ? 0 : precision;

  var random = Math.random() * (max - min) + min;

  return random.toFixed(precision);
}

function getUTCDate() {
  var now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuote2(socket, ticker) {
  var dataObj;

  var quote = {};
  quote.ticker = ticker;
  quote.exchange = 'NASDAQ';
  quote.price = getRandomValBetween(100, 300, 2);
  quote.change = getRandomValBetween(0, 200, 2);
  quote.change_percent = getRandomValBetween(0, 1, 2);
  quote.last_trade_time = getUTCDate();
  quote.dividend = getRandomValBetween(0, 1, 2);
  quote.yield = getRandomValBetween(0, 2, 2);

  socket.emit(ticker, PRETTY_PRINT_JSON ? JSON.stringify(quote, null, 4) : JSON.stringify(quote));
}

function trackTicker(socket, ticker) {
  console.log('track Ticker');

  // run the first time immediately
  getQuote2(socket, ticker);

  // every N seconds
  var timer = setInterval(function() {
    getQuote2(socket, ticker);
  }, FETCH_INTERVAL);

  socket.on('disconnect', function() {
    clearInterval(timer);
  });
}

var app = express();
app.use(cors());
var server = http.createServer(app);

var io = io.listen(server);
io.set('origins', '*:*');

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
  socket.on('ticker', function(ticker) {
    trackTicker(socket, ticker);
  });
});

server.listen(process.env.PORT || 4000);
