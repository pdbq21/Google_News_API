const express = require('express');
const server = express();
const {logger} =  require('./logger');

const PORT =  process.env.PORT || 3000;

server.get('/', (req, res)=> {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    logger(ip, 'ip');
    res.send('ip: ' + ip)
});

server.listen(PORT, function(){
    console.log('server working on port '+ PORT)
});