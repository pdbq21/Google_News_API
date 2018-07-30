const express = require('express');
const maxmind = require('maxmind');
const server = express();
const {logger} = require('./logger');
const {getNews} = require('./news');
const PORT = process.env.PORT || 3000;

function getCountryCode(ip, next) {
    console.log(2);
    let log;
    if (maxmind.validate(ip)) {
        log = ip;
        maxmind.open('./db/geo.mmdb', (err, data) => {
            console.log(3)
            const info = data.get(ip);
            if (!!info) {
                console.log(4);
                getNews(info.country.iso_code, next);
                /*ipInfo = `<div>IP: ${ip}</div>
                        <div>City: ${info.city.names.en}</div>
                        <div>Country: ${info.country.iso_code}</div>
                        <div>Location: ${info.location}</div>`;*/
            } else {
                log = 'Warning: information about this ip (' + ip + ') not found'
            }
        });
    } else {
        log = 'Error: Not validate ip: ' + ip;
        logger(log, 'ip');
        next(log);
    }
}

server.get('/', (req, res) => {
    console.log(1);
    const ip = req.headers['x-forwarded-for'].replace(/,.*/, '') || req.connection.remoteAddress;
     //const ip = '180.90.80.220';
    getCountryCode(ip, data => res.send(data));
});

server.listen(PORT, function () {
    console.log('server working on port ' + PORT)
});
