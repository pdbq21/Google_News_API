// google news api
// token in api.txt
const fs = require('fs');
const fetch = require('node-fetch');
const {logger} =  require('./logger');
/*
fs.readFile('./api.txt', 'utf8', function (err, data) {
    if (err) logger(err, 'error');
    else getNews(data.match(/API_TOKEN=(.*?);/)[1]);
});
*/

exports.getNews = function(country, next) {
    const token = '6da9c0184c7048ae9245ff3898989e75';
    const url = 'https://newsapi.org/v2/top-headlines?' +
        'country=' +country+
        '&apiKey=' + token;

    fetch(url)
        .then(res => res.json())
        .then(next);
}


// - todo: get country code by ip
