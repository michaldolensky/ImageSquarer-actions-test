import { ipcMain } from 'electron';

const initFolderIPC = (window, store) => {
  const chanelPrefix = 'folder.';

  ipcMain
    .on(`${chanelPrefix}inputFolderPath`, (event, path) => {
      store.set('folder.inputFolderPath', path);
    }).handle(`${chanelPrefix}inputFolderPath`, async (event, someArgument) => store.get('folder.inputFolderPath'));

  ipcMain
    .on(`${chanelPrefix}outputFolderPath`, (event, path) => {
      store.set('folder.outputFolderPath', path);
    }).handle(`${chanelPrefix}outputFolderPath`, async (event, someArgument) => store.get('folder.outputFolderPath'));
};
export default initFolderIPC;
