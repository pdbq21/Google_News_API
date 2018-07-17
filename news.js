// google news api
// token in api.txt
const fs = require('fs');
const fetch = require('node-fetch');

function logger(err) {
    const log = (new Date()) + ' - ' + err + '\r\n';
    fs.appendFile('error.log', log, 'utf8', function (err) {
        if (err) throw err;
    })
}

fs.readFile('./api.txt', 'utf8', function (err, data) {
    if (err) logger(err);
    getNews(data.match(/API_TOKEN=(.*?);/)[1]);
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
