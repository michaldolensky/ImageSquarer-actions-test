import { ipcMain } from 'electron';

export const initIpcSettings = (window, store) => {
  // Folder settings

  ipcMain.on('inputFolderPath', (event, path) => {
    store.set('folder.inputFolderPath', path);
  }).handle('inputFolderPath', async (event, someArgument) => store.get('folder.inputFolderPath'));
  ipcMain.on('outputFolderPath', (event, path) => {
    store.set('folder.outputFolderPath', path);
  }).handle('outputFolderPath', async (event, someArgument) => store.get('folder.outputFolderPath'));

  ipcMain.on('ImageWidth', (event, path) => {
    store.set('image.imageWidth', path);
  }).handle('ImageWidth', async (event, someArgument) => store.get('image.imageWidth'));

  ipcMain.on('ImageHeight', (event, path) => {
    store.set('image.imageHeight', path);
  }).handle('ImageHeight', async (event, someArgument) => store.get('image.imageHeight'));

  ipcMain.on('ImageColor', (event, path) => {
    store.set('image.imageColor', path);
  }).handle('ImageColor', async (event, someArgument) => store.get('image.imageColor'));
  ipcMain.on('ImageAlpha', (event, path) => {
    store.set('image.imageAlpha', path);
  }).handle('ImageAlpha', async (event, someArgument) => store.get('image.imageAlpha'));
};
