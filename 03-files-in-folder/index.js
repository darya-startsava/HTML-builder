const { readdir } = require('fs/promises');
const fs = require('fs');
const path = require('path');

async function readFilesName() {
    try {
        const files = (await readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true })).filter(item => item.isFile());
        for (const file of files) {
            function readFileSize() {
                fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
                    console.log(`${file.name.substr(0, (file.name.length - path.extname(file.name).length))
                        } - ${path.extname(file.name).slice(1)} - ${stats.size}b`);
                })
            }
            readFileSize()
        }
    } catch (err) {
        console.error(err);
    }
}


readFilesName();

