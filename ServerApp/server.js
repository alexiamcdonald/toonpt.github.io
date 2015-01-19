﻿var express = require('express'); //express npm module
var request = require('request'); //request npm module
var url = require('url'); //url npm module
var SentimentAnalysis = require('./SentimentAnalysis/SentimentAnalysis.js');

//[get a express app started]
var serverApp = express();

//[route definitio:... home]
serverApp.get('/', function (req, response) {
    console.log("\n -Hello request");

    request(url, function(err, res, body) {
        response.render('hello.ejs');//file on views folder
    });
});

//[Route definition: /countsWords]
serverApp.get('/countsWords', function (req, response) {
    console.log("\n -Data Counts Call...");
    

});

//[Route definition: /sentiment/searchString]
serverApp.get('/sentiment/:searchString', function (req, response) {
    
    //get the request string data...
    var searchString = req.params.searchString;
    console.log("\n -Sentiment Call... About: " + searchString);

    //Call Tweeter...
    var connector = require('./TwitterConnector/TwitterConnector.js');
});

//[Start listen on port]
var server = serverApp.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    if (host == "0.0.0.0")
        host = "localhost";
    console.log('\nApp listening at http://%s:%s', host, port);
});

//[Sentiment Analysis System Up and ready]
var system = new SentimentAnalysis();
system.Start();
