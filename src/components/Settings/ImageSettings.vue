<template>
  <div>
    <div class="text-h4 q-mb-md">
      Output Image settings
    </div>
    Dimension
    <div class="q-gutter-md row items-start">
      <q-input
        v-model.number="dimensions.width"
        label="Width"
        type="number"
        style="max-width: 200px"
      >
        <template #append>
          px
        </template>
      </q-input>
      <span style="padding-top: 25px">X</span>
      <q-input
        v-model.number="dimensions.height"
        label="Height"
        type="number"
        style="max-width: 200px"
      >
        <template #append>
          px
        </template>
      </q-input>
    </div>
    <br>
    Background color

    <div class="q-gutter-md row items-start">
      <q-input
        v-model="backgroundColor.value"
        label="BackgroundColor"
        :rules="['anyColor']"
        class="my-input"
      >
        <template #append>
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
      <q-input
        v-model.number="alpha.value"
        label="Alpha"
        type="number"
        max="1"
        min="0"
        step="0.1"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from 'quasar';

const { ipcRenderer } = require('electron');

const channelPrefix = 'image.';

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
      handler: debounce((after) => {
        ipcRenderer.invoke(`${channelPrefix}width.set`, after);
      }),
      deep: true,
    },
    'dimensions.height': {
      handler: debounce((after) => {
        ipcRenderer.invoke(`${channelPrefix}height.set`, after);
      }),
      deep: true,
    },
    'backgroundColor.value': {
      handler: debounce((after) => {
        ipcRenderer.invoke(`${channelPrefix}color.set`, after);
      }),
      deep: true,
    },
    'alpha.value': {
      handler: debounce((after) => {
        ipcRenderer.invoke(`${channelPrefix}alpha.set`, after);
      }),
      deep: true,
    },
  },
  async mounted() {
    this.dimensions.width = await ipcRenderer.invoke(`${channelPrefix}width.get`);
    this.dimensions.height = await ipcRenderer.invoke(`${channelPrefix}height.get`);
    this.dimensions.color = await ipcRenderer.invoke(`${channelPrefix}color.get`);
    this.dimensions.alpha = await ipcRenderer.invoke(`${channelPrefix}alpha.get`);
  },
};
</script>

<style scoped>

</style>
