<template>
  <div>
    <div class="text-h4 q-mb-md">
      Folder settings
    </div>
    <q-input
      v-model="inputFolder.path"
      label="Input folder"
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
          @click="openInputDialog"
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
          @click="openOutputDialog"
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
        isLoading: false,
      },
      outputFolder: {
        path: '',
        isLoading: false,
      },
    };
  },
  watch: {
    'inputFolder.path': {
      handler(after) {
        ipcRenderer.invoke(`${channelPrefix}inputFolder.set`, after);
      },
      deep: true,
    },
    'outputFolder.path': {
      handler(after) {
        ipcRenderer.invoke(`${channelPrefix}outputFolder.set`, after);
      },
      deep: true,
    },
  },
  async mounted() {
    this.inputFolder.path = await ipcRenderer.invoke(`${channelPrefix}inputFolder.get`);
    this.outputFolder.path = await ipcRenderer.invoke(`${channelPrefix}outputFolder.get`);
  },
  methods: {
    async openInputDialog() {
      this.inputFolder.isLoading = true;
      const result = await ipcRenderer.invoke(`${channelPrefix}inputFolder.select`);
      this.inputFolder.isLoading = false;
      if (!result.canceled) [this.inputFolder.path] = result.filePaths;
    },
    async openOutputDialog() {
      this.outputFolder.isLoading = true;
      const result = await ipcRenderer.invoke(`${channelPrefix}outputFolder.select`);
      this.outputFolder.isLoading = false;
      if (!result.canceled) [this.outputFolder.path] = result.filePaths;
    },
  },
};
</script>
