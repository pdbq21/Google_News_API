// google news api
// token in api.txt
const fs = require('fs');
const fetch = require('node-fetch');
const {logger} =  require('./logger');

fs.readFile('./api.txt', 'utf8', function (err, data) {
    if (err) logger(err, 'error');
    else getNews(data.match(/API_TOKEN=(.*?);/)[1]);
});


function getNews(token) {
    const url = 'https://newsapi.org/v2/top-headlines?' +
        'country=ua&' +
        'apiKey=' + token;

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
}


// - todo: get country code by ip
