<template>
  <q-page padding>
    <div>
      <q-splitter
        v-model="splitterModel"
        style="height: auto"
      >
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            class="text-teal"
          >
            <q-tab
              name="folder"
              icon="folder"
              label="Folder"
            />
            <q-tab
              name="image"
              icon="insert_photo"
              label="Image"
            />
            <q-tab
              name="notification"
              icon="notifications"
              label="Notification"
            />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="folder">
              <folderSettings />
            </q-tab-panel>

            <q-tab-panel name="image">
              <div class="text-h4 q-mb-md">
                Output Image settings
              </div>
              Dimensions
              <q-input
                v-model.number="config.image.dimensions.width"
                label="Width"
                type="width"
                style="max-width: 200px"
              />
              <q-input
                v-model.number="config.image.dimensions.height"
                label="Height"
                type="number"

                style="max-width: 200px"
              />
              <q-input
                v-model="config.image.backgroundColor.value"
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
                      <q-color v-model="config.image.backgroundColor.value" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-tab-panel>

            <q-tab-panel name="notification">
              <div class="text-h4 q-mb-md">
                Notification
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script>
import FolderSettings from 'components/Settings/FolderSettings';

const { ipcRenderer } = require('electron');

export default {
  components: { FolderSettings },
  // name: 'PageName',
  data() {
    return {
      tab: 'image',
      splitterModel: 20,
      config: {
        image: {
          dimensions: {
            enabled: true,
            width: 1000,
            height: 1000,
          },
          backgroundColor: {
            enabled: true,
            value: '#ffffff',
          },
        },
      },
    };
  },
};
</script>
