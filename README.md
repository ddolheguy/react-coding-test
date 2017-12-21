# Pricing Blotter Test
A boilerplate for displaying price data using react, redux and react-router with the help of webpack.

Contains: 

* a working example of a filterable table which you can play around with (look below).
* ES6 - 7 Support with Babel
* Redux dev tools to help you keep track of the app's state
* Routing
* hot module replacement support so you can change modules or react components without having to reload the browser
* a webpack production config so you can build the app and make it ready for production
* Sass support, just import your styles wherever you need them
* eslint to keep your js readable

## Prerequisites
* A suitable IDE, ie WebStorm, VSCode etc
* Ideally a cygwin, or bash terminal
* Node, NPM
* If you're on a windows platform, you will need to run the following command: ``npm install --global --production windows-build-tools`` (using a privileged command prompt)

## Run the service
0. Open a new bash shell
0. cd streaming-service
0. ```npm install```
0. ```npm run start```

## Run the app
1. Open a new bash shell
1. cd app
1. ```npm install```
1. ```npm run start```

Once running, if you want to hide the redux dev monitor: ```CTRL+H``` or move it with ```CTRL+Y```


## Run the tests
2. Open a new bash shell
2. cd app
2. ```npm run test_watch```

## Requirements

We need you to implement a solution to display some price ticker data on the UI in realtime. Price data is available from a locally running service. Any additional visuallisations to indicate how prices have changed would be a plus. Testing is also an important part to this exercise.

There are four parts to this application that need implementing, we suggest that the candidate time box their efforts in each section.

3. Testing:
    We need test coverage for any code implemented. Chai, Sinon, Mocha, Enzyme are already included as libraries, however feel free to implement any tests in your choice of framework. The existing tests should be running according to the instructions above.
3. Service interaction: 
    The interviewer will setup a local streaming service () to run on your machine that will publish prices for a given ticker at an        interval of 0.5 seconds. We want to be able see these prices rendered on the ui. Although the service api exists it is not connected yet.
3. Data:
    We need to be able convey the service api results to the UI
3. UI:
    We need the service results to be rendered on the UI via a component, any additional visual effects to highlight positive or negative changes in the     prices would be a bonus.

## Price Serive Usage

**Apple Inc. (AAPL)**
### <http://localhost:4000/#AAPL>

Simply replace **AAPL** in the URL with a **valid ticker symbol**. Price tickers are real-time.

## Example JSON Response from the Price Ticker service

    {
        "ticker": "AAPL",
        "exchange": "NASDAQ",
        "price": "116.60",
        "change": "-0.46",
        "change_percent": "-0.39",
        "last_trade_time": "Oct 21, 4:00PM EDT",
        "dividend": "0.57",
        "yield": "1.96"
    }
