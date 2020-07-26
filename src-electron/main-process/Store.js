const Store = require('electron-store');

const schema = {
  inputFolderPath: {
    type: 'string',
    maximum: 100,
    minimum: 1,
    default: 50,
  },
  bar: {
    type: 'string',
    format: 'url',
  },
};

const settingsStoreTEST = new Store({ schema });

export default settingsStoreTEST;
