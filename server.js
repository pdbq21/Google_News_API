const express = require('express');
const server = express();

server.set('port', process.env.PORT || 3000);
server.get('/', (req, res)=> {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.send('Test: ' + ip)
});

server.listen(server.get('port'), function(){
    console.log('server working on port '+ server.get('port'))
});