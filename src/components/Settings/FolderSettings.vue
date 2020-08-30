<template>
  <div>
    <div class="text-h4 q-mb-md">
      Folder settings
    </div>
    <q-input
      v-model="inputFolder.path"
      slabel="Input folder"
      :loading="inputFolder.isLoading"
    >
      <template v-slot:prepend>
        <q-icon name="input" />
      </template>
      <template v-slot:after>
        <q-btn
          round
          dense
          flat
          icon="folder_open"
        />
      </template>
    </q-input>
    <q-input
      v-model="outputFolder.path"
      label="Output folder"
      :loading="outputFolder.isLoading"
    >
      <template v-slot:prepend>
        <q-icon name="exit_to_app" />
      </template>
      <template v-slot:after>
        <q-btn
          round
          dense
          flat
          icon="folder_open"
        />
      </template>
    </q-input>
  </div>
</template>
<script>
const { ipcRenderer } = require('electron');

const channelPrefix = 'folder.';

export default {
  name: 'FolderSettings',
  data() {
    return {
      inputFolder: {
        path: '',
        isLoading: true,
      },
      outputFolder: {
        path: '',
        isLoading: true,
      },
    };
  },
  watch: {
    'inputFolder.path': {
      handler(after) {
        ipcRenderer.send(`${channelPrefix}inputFolderPath`, after);
      },
      deep: true,
    },
    'outputFolder.path': {
      handler(after) {
        ipcRenderer.send(`${channelPrefix}outputFolderPath`, after);
      },
      deep: true,
    },
  },
  mounted() {
    ipcRenderer.invoke(`${channelPrefix}inputFolderPath`).then((result) => {
      console.log(result);
      this.inputFolder.path = result;
    });
    ipcRenderer.invoke(`${channelPrefix}outputFolderPath`).then((result) => {
      console.log(result);
      this.outputFolder.path = result;
    });
  },
};
</script>
