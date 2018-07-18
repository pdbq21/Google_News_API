const express = require('express');
const maxmind = require('maxmind');
const server = express();
const {logger} = require('./logger');

const PORT = process.env.PORT || 3000;

function getCountryCode(ip) {
    let log, ipInfo;
    if (maxmind.validate(ip)) {
        log = ip;
        maxmind.open('./db/geo.mmdb', (err, data) => {
            const info = data.get(ip);
            if (!!info) {
                ipInfo = `<div>IP: ${ip}</div>
                        <div>City: ${info.city.names.en}</div>
                        <div>Country: ${info.country.iso_code}</div>
                        <div>Location: ${info.location}</div>`;
            } else {
                log = 'Warning: information about this ip (' + ip + ') not found'
            }
        });
    } else {
        log = 'Error: Not validate ip: ' + ip;
    }
    logger(log, 'ip');
    return ipInfo || 'not found information';
}

server.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send(getCountryCode(ip))
});

server.listen(PORT, function () {
    console.log('server working on port ' + PORT)
});