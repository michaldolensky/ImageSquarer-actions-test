import {
  app, BrowserWindow, nativeTheme, ipcMain,
} from 'electron';
// import sharp from 'sharp';
// import chokidar from 'chokidar';
//
// import path from 'path';
// import fs from 'fs';

import Store from 'electron-store';

require('dotenv').config();

const store = new Store();

function* idMaker() {
  let index = 0;
  while (true) {
    index += 1;
    yield index;
  }
}
const gen = idMaker();

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'));
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = __dirname;
}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    darkTheme: false,
    useContentSize: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC

ipcMain.on('message', (event, data) => {
  // console.log(`Received: ${data}`);
  event.sender.send('message', 'Hello interface!');
});
ipcMain.on('config', (event, data) => {
  // console.log(`Received: ${data}`);
  store.set('CONFIG', { test: data });
  // event.sender.send('message', 'Hello interface!');
});

ipcMain.on('message-sync', (event, data) => {
  // console.log(`Received: ${data}`);
  event.returnValue = 'Hello interface (synchronous)!';
});

// const fileOut = process.env.FILE_OUTPUT_FOLDER;
//
// if (!fs.existsSync(fileOut)) {
//   fs.mkdirSync(fileOut);
// }
//
// const watcher = chokidar.watch(process.env.FILE_INPUT_FOLDER, {
//   depth: 0,
//   persistent: true,
//   ignoreInitial: true,
//   ignored: process.env.IGNORED_FILES,
// });
// watcher
//   .on('add', async (file) => {
//     console.log(`File ${file} has been added`);
//     const image = sharp(file);
//     const a = await image
//       .metadata()
//       .then((metadata) => {
//         let max;
//         if (metadata.width > metadata.height) {
//           max = metadata.width;
//         } else {
//           max = metadata.height;
//         }
//         const outputFile = `${fileOut}${gen.next().value}-edit${path.basename(file)}`;
//
//         return image
//           .resize({
//             width: max,
//             height: max,
//             fit: sharp.fit.contain,
//             background: {
//               r: 0, g: 0, b: 0, alpha: 0.0,
//             },
//           })
//           .png()
//           .toFile(outputFile, (err, info) => {
//             // console.log(this);
//
//           });
//       }).then(() => {
//         setTimeout(() => { fs.unlinkSync(file); }, 60000);
//       });
//   });
