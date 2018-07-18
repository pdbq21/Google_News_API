const fs = require('fs');


// error read | ip
exports.logger = function(data, type) {
    const log = (new Date()) + ' - ' + data + '\r\n';
    const file = type + '.log';
    fs.appendFile(file, log, 'utf8', function (err) {
        if (err) throw err;
    })
};
