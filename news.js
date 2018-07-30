// google news api
// token in api.txt
const fs = require('fs');
const fetch = require('node-fetch');
const {logger} =  require('./logger');

function api(token, country, callback){
    console.log(6)
    const url = 'https://newsapi.org/v2/top-headlines?' +
        'country=' +country+
        '&apiKey=' + token;

    fetch(url)
        .then(res => res.json())
        .then(callback);
}


exports.getNews = function(country, next) {
    console.log(5);
    fs.readFile('./api.txt', 'utf8', function (err, data) {
        if (err) logger(err, 'error');
        else api(data.match(/API_TOKEN=(.*?);/)[1], country, next);
    });
};


