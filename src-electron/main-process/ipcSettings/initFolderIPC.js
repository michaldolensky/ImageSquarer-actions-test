import { ipcMain } from 'electron';

const { dialog } = require('electron');

const initFolderIPC = (window, store) => {
  const chanelPrefix = 'folder.';

  // Input
  ipcMain.handle(`${chanelPrefix}inputFolder.set`, async (event, path) => {
    store.set('folder.inputFolderPath', path);
    return null;
  });
  ipcMain.handle(`${chanelPrefix}inputFolder.get`, async () => store.get('folder.inputFolderPath'));
  ipcMain.handle(`${chanelPrefix}inputFolder.select`, async () => {
    const folder = await dialog.showOpenDialog({
      title: 'Select input folder',
      properties: ['openDirectory'],
    });
    if (!folder.canceled) {
      store.set('folder.inputFolderPath', folder.filePaths[0]);
    }
    return folder;
  });

  // Output
  ipcMain.handle(`${chanelPrefix}outputFolder.set`, async (event, path) => {
    store.set('folder.outputFolderPath', path);
    return null;
  });
  ipcMain.handle(`${chanelPrefix}outputFolder.get`, async () => store.get('folder.outputFolderPath'));
  ipcMain.handle(`${chanelPrefix}outputFolder.select`, async () => {
    const folder = await dialog.showOpenDialog({
      title: 'Select input folder',
      properties: ['openDirectory'],
    });
    if (!folder.canceled) {
      store.set('folder.outputFolderPath', folder.filePaths[0]);
    }
    return folder;
  });
};
export default initFolderIPC;
