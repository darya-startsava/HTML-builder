const { rm, mkdir, readdir, readFile, appendFile, copyFile } = require('fs/promises');
const path = require('path');
const pathDir = path.join(__dirname, 'project-dist');

async function deleteDir() {
    await rm(pathDir, { recursive: true, force: true });
}

async function createDir() {
    await deleteDir();
    await mkdir(pathDir, { recursive: true });
}

async function createHtmlFile() {
    try {
        let content = await readFile(path.join(__dirname, 'template.html'), { encoding: 'UTF-8' });
        const htmlFiles = (await readdir(path.join(__dirname, 'components'))).filter(item => path.extname(item) === '.html');
        for (let htmlFile of htmlFiles) {
            let tag = `{{${htmlFile.substr(0, (htmlFile.length - path.extname(htmlFile).length))}}}`;
            if (content.includes(tag)) {
                content = content.split(tag);
                content = content[0] + await readFile(path.join(__dirname, 'components', htmlFile), { encoding: 'UTF-8' }) + content[1];
            }
        }
        await appendFile(path.join(__dirname, 'project-dist', 'index.html'), content);
    } catch (err) {
        console.log(err);
    }
}

async function createCssFile() {
    try {
        const files = (await readdir(path.join(__dirname, 'styles'), { withFileTypes: true })).filter(item =>
            item.isFile() && path.extname(item.name) === '.css');
        for (let file of files) {
            let content = await readFile(path.join(__dirname, 'styles', file.name), { encoding: 'UTF-8' });
            await appendFile(path.join(__dirname, 'project-dist', 'style.css'), content + '\n');
        }
    } catch (err) {
        console.log(err);
    }
}

async function createAssetsFolder(copyTo) {
    await mkdir(copyTo, { recursive: true });
}

async function copyAssetsFolder(copyTo, copyFrom) {
    await createAssetsFolder(copyTo);
    try {
        const assets = (await readdir(copyFrom, { withFileTypes: true }));
        for (let i = 0; i < assets.length; i++) {
            const fileName = assets[i].name;
            if (assets[i].isDirectory()) {
                const to = path.join(copyTo, fileName);
                const from = path.join(copyFrom, fileName);
                copyAssetsFolder(to, from);
            } else {
                await copyFile(path.join(copyFrom, fileName), path.join(copyTo, fileName));
            }
        }
    } catch (err) {
        console.log(err);
    }
}

(async function () {
    await createDir();
    await createHtmlFile();
    await createCssFile();
    await copyAssetsFolder(path.join(__dirname, 'project-dist', 'assets'), path.join(__dirname, 'assets'))
}());