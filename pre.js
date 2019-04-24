const fs = require('fs');

async function deleteDirectory(path, self) {
    if (!fs.existsSync(path)) {
        return;
    }
    let files = await fs.promises.readdir(path);
    for(let i in files) {
        let file = files[i];
        let filePath = path + '/' + file;
        let stat = await fs.promises.stat(filePath);
        if (stat.isDirectory()) {
            await deleteDirectory(filePath, true);
        } else {
            await fs.promises.unlink(filePath);
        }
    }
    if (self) {
        await fs.promises.rmdir(path);
    }
}

// 清空编译文件夹
deleteDirectory('build', false).then(function () {
    fs.copyFileSync('src/index.html', 'build/index.html');
}).catch(function (err) {
    console.log(err);
});
