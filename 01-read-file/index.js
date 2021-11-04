let fs = require('fs');
const path = require('path');
reader = fs.createReadStream(path.join(`${__dirname}`, 'text.txt'));
reader.on('data', function(chunk) {
    console.log(chunk.toString());
});