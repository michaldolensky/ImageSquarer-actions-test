<template>
  <div>
    <div class="text-h4 q-mb-md">
      Output Image settings
    </div>
    Dimension
    <q-input
      v-model.number="dimensions.width"
      label="Width"
      type="width"
      style="max-width: 200px"
    />
    <q-input
      v-model.number="dimensions.height"
      label="Height"
      type="number"

      style="max-width: 200px"
    />
    <q-input
      v-model="backgroundColor.value"
      label="BackgroundColor"
      :rules="['anyColor']"
      hint="With validation"
      class="my-input"
    >
      <template v-slot:append>
        <q-icon
          name="colorize"
          class="cursor-pointer"
        >
          <q-popup-proxy
            transition-show="scale"
            transition-hide="scale"
          >
            <q-color v-model="backgroundColor.value" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron');

export default {
  name: 'ImageSettings',
  data() {
    return {
      dimensions: {
        enabled: true,
        width: 1000,
        height: 1000,
      },
      backgroundColor: {
        enabled: true,
        value: '#ffffff',
      },
      alpha: {
        enabled: true,
        value: 0.0,
      },

    };
  },
  watch: {
    'dimensions.width': {
      handler(after) {
        console.log(after);
        ipcRenderer.send('ImageWidth', after);
      },
      deep: true,
    },
    'dimensions.height': {
      handler(after) {
        ipcRenderer.send('ImageHeight', after);
      },
      deep: true,
    },
  },
  mounted() {
    ipcRenderer.invoke('ImageWidth').then((result) => {
      console.log(result);
      this.dimensions.width = result;
    });
    ipcRenderer.invoke('ImageHeight').then((result) => {
      console.log(result);
      this.dimensions.height = result;
    });
  },
};
</script>

<style scoped>

</style>
