const express = require('express');
const server = express();

server.set('port', process.env.PORT || 3000);
server.get('/', (req, res)=> {
    res.send('Test')
});

server.listen(server.get('port'), function(){
    console.log('server working on port '+ server.get('port'))
});