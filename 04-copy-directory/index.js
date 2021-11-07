const fs = require('fs');
const { constants } = require('fs');
const { copyFile, mkdir, readdir, rm } = require('fs/promises');
const path = require('path');

async function copyFiles() {
    try {
        const files = (await readdir(path.join(__dirname, 'files')));
        for (let i = 0; i < files.length; i++) {
            await copyFile(path.join(__dirname, 'files', files[i]), path.join(__dirname, 'files-copy', files[i]));
        }
    } catch (err) {
        console.log(err);
    }
}

async function deleteDir() {
    await fs.promises.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true });
}

async function createDir() {
    await deleteDir();
    await fs.promises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
}

(async function copyDir() {
    await createDir();
    copyFiles();
}());

