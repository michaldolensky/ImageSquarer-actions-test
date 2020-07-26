import { ipcMain } from 'electron';
import Store from '../Store';

export const initIpcSettings = (window) => {
  setInterval(() => {
    window.webContents.send('test', Math.random());
  }, 1000);

  ipcMain.on('config.inputFolderPath', (event, path) => {
    console.log(`Received: ${path}`);
    Store.set('inputFolderPath', path);

    // event.sender.send('message', 'Hello interface!');
  });
  ipcMain.handle('some-name', async (event, someArgument) => Store.get('inputFolderPath'));
};
