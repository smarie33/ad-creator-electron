// Modules to control application life and create native browser window
const ***REMOVED***app, BrowserWindow***REMOVED*** = require('electron');
const ***REMOVED***serverLive***REMOVED*** = require('./app.js');
const path = require('path');
const ***REMOVED*** fork ***REMOVED*** = require("child_process");
const dbData = require('./data/db.json');
const log = require('electron-log/main');
const fs = require('fs');
const userDataPathM = app.getPath('userData');

const logpath = path.join(userDataPathM, '/hptologs/');
fs.mkdir(logpath, ***REMOVED*** recursive: true ***REMOVED***, (err) => ***REMOVED***
  fs.open(logpath + 'main.log', 'w', function (err, file) ***REMOVED******REMOVED***)
***REMOVED***);

let envrmt;
if(fs.existsSync(path.join(userDataPathM, '/hptodata')))***REMOVED***
  envrmt = require(path.join(userDataPathM, '/hptodata/enviornment.json'));
***REMOVED***else***REMOVED***
  envrmt = require('./data/enviornment.json');
***REMOVED***

// Optional, initialize the logger for any renderer process
log.initialize(***REMOVED*** preload: true ***REMOVED***);
log.transports.file.resolvePathFn = () => logpath + 'main.log';
console.log = log.log;

function createWindow () ***REMOVED***

  const mainWindow = new BrowserWindow(***REMOVED***
    width: 1300,
    height: 1000,
    webPreferences: ***REMOVED***
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    ***REMOVED***
  ***REMOVED***)

  mainWindow.loadURL(envrmt.url);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
***REMOVED***

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => ***REMOVED***
  createWindow();
  app.on('activate', function () ***REMOVED***
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  ***REMOVED***)

  app.on('resize', function(e,x,y)***REMOVED***
    mainWindow.setSize(x, y);
  ***REMOVED***);
***REMOVED***)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () ***REMOVED***
  if (process.platform !== 'darwin') app.quit()
***REMOVED***)