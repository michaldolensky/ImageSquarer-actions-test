<template>
  <q-page class="flex flex-center">
    {{ message }}
    <br>
    <q-input
      v-model="text"
      label="Standard"
    />
  </q-page>
</template>

<script>

const { ipcRenderer } = require('electron');

ipcRenderer.send('message', 'Hello server!');
// const answer = ipcRenderer.sendSync('message-sync', 'Hello server sync!');
// document.getElementById('storageSync').innerHTML = answer;

export default {
  name: 'PageIndex',
  data() {
    return {
      message: 'default',
      text: 'a',
    };
  },
  watch: {
    text(val) {
      ipcRenderer.send('config', val);
    },
  },
  mounted() {
    ipcRenderer.on('message', (event, msg) => {
      // console.log(msg);
      this.message = msg;
      // event.reply('pong', 'ping-pong');
    });

    ipcRenderer.on('test', (event, msg) => {
      console.log(msg);
      // this.message = msg;
    });
  },

};
</script>
