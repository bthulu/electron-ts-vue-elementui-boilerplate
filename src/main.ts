import {app, BrowserWindow} from "electron";

function createWindow() {
    let win = new BrowserWindow({width: 1024, height: 700});
    win.loadURL(`file://${__dirname}/index.html`);
    if (process.env.NODE_ENV === 'development') {
        require('devtron').install();
        require('electron-debug')();
        win.webContents.openDevTools();
    }
}

app.on('ready', createWindow);
