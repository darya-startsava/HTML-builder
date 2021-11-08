const fs = require('fs');
const path = require('path');
const reader = fs.createReadStream(path.join(`${__dirname}`, 'text.txt'));
reader.on('data', function(chunk) {
    console.log(chunk.toString());
});