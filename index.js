'use strict';

var fs = require('fs');
var marked = require('marked');
var superagent = require('superagent');
var express = require('express');
var bodyParser = require('body-parser');
var app = express()
app.use(bodyParser.json());
var PORT = process.env.PORT || 5000
app.set('port', PORT)

function loadKey(filename, envVarName) {
    try {
        return new String(fs.readFileSync(filename)).trim();
    } catch (e) {
        return process.env[envVarName];
    }
}

// Get API key
var apikey = loadKey('./openweather-apikey.txt', 'OPEN_WEATHER_API_KEY');

// Historical Data endpoint. City can be a name or id.
var cache = {};
app.get('/:city', function(req, res) {
    var city = req.params.city;
    if (cache[city]) {
        console.log('Returning cached response for "' + city + '".');
        return res.json(cache[city]);
    }
    var query = {
        'APPID': apikey
    };
    if (parseInt(city)) {
        query.id = city
    } else {
        query.q = city
    }
    superagent
        .get('http://api.openweathermap.org/data/2.5/forecast/city')
        .set('Accept', 'application/json')
        .query(query)
        .end(function(err, innerres) {
            if (err) {
                console.log('Returning error for "' + city + '".');
                return res.json({
                    'error': 'Woops.'
                });
            }
            var dataToReturn = innerres.body;
            cache[city] = dataToReturn;
            console.log('Returning new reponse for "' + city + '".');
            res.json(dataToReturn);
        });
});
setInterval(function() {
    cache = {};
    console.log('Response cache cleared.');
}, 600000);

// Set up home page to server api from.
var apiHtml = marked(fs.readFileSync('./API.md', 'utf8'));
app.get('/', function(req, res) {
    res.send(apiHtml);
});

app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT + '...');
});
