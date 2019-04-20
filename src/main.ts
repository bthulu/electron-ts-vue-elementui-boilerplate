import {app, BrowserWindow} from "electron";

function createWindow() {
    let win = new BrowserWindow({width: 1024, height: 700});
    if (process.env.NODE_ENV === 'development') {
        require('devtron').install();
        require('electron-debug')();
        win.loadURL(process.env["PUBLIC_PATH"] + "/index.html");
        win.webContents.openDevTools();
    } else {
        win.loadURL(`file://${__dirname}/index.html`);
    }
}

app.on('ready', createWindow);
