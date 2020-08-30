import { ipcMain } from 'electron';
import initImageIPC from './initImageIPC';
import initFolderIPC from './initFolderIPC';

export const initIpcSettings = (window, store) => {
  initFolderIPC(window, store);
  initImageIPC(window, store);
};
