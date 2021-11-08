const fs = require('fs');
const { readdir, writeFile, readFile, appendFile, rm } = require('fs/promises');
const path = require('path');

async function deleteFile() {
    await rm(path.join(__dirname, 'project-dist', 'bundle.css'), { recursive: true, force: true });
}

(async function someFunction() {
     await deleteFile();
    try {
        const files = (await readdir(path.join(__dirname, 'styles'), { withFileTypes: true })).filter(item =>
            item.isFile() && path.extname(item.name) === '.css');
        for (let file of files) {
            console.log(file);
            let content = await readFile(path.join(__dirname, 'styles', file.name), { encoding: 'UTF-8' });
            // console.log(content);
            await appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), content + '\n');
        }
    } catch (err) {
        console.log(err)
    }
}());
