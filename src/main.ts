import {app, BrowserWindow, Menu} from "electron";

function createWindow() {
    let win = new BrowserWindow({show: false, width: 1024, height: 700});
    win.loadURL(`file://${__dirname}/index.html`);
    if (process.env.NODE_ENV === 'development') {
        require('devtron').install();
        require('electron-debug')();
        win.webContents.openDevTools();
        win.webContents.on('context-menu', (e, props) => {
            const {x, y} = props;
            Menu.buildFromTemplate([{
                label: 'Inspect element',
                click: () => win.webContents.inspectElement(x, y)
            }]).popup({
                window: win
            });
        });
        win.once('ready-to-show', () => {
            win.show();
        });
    }
}

app.on('ready', createWindow);
