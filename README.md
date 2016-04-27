# JTC Cow Weather API

This REST API gets historical weather data for a given city.

## API

For current weather data, send a get request to /yourcity, and
the backend will send back a json file containing a lot of information with the current weather,
including temperatures, precipitation, and meta data. The data is from openweathermap.org.

The backend is written in node.js, and is simply a relay for transferring data from the
openweatherapp.org api.

Initially, we planned to grab historical weather for cities on demand, but money. :(

## Building locally and running.

First, get your own openweather apikey and put in a text file in your root project directory,
or set it in the environment varaible OPEN\_WEATHER\_API\_KEY.

Then, install node.js and npm, and run:
```bash
npm install && npm start
```
This installs project dependencies and runs it on localhost port 5000.

## More

Here is a cow.

![Cow](http://www.alternet.org/files/styles/story_image/public/images/managed/storyimages_1331829918_cow.jpg)

