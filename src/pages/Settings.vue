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
              <FolderSettings />
            </q-tab-panel>

            <q-tab-panel name="image">
              <ImageSettings />
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
import ImageSettings from 'components/Settings/ImageSettings';

const { ipcRenderer } = require('electron');

export default {
  name: 'Settings',
  components: { FolderSettings, ImageSettings },
  data() {
    return {
      tab: 'folder',
      splitterModel: 20,
    };
  },
};
</script>
