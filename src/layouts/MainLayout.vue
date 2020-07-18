<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-primary text-white"
      height-hint="98"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          ImageSquarer
        </q-toolbar-title>
        <q-btn
          flat
          round
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          @click="$q.dark.toggle()"
        />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab
          to="/"
          label="Log"
        />
        <q-route-tab
          to="/settings"
          label="Settings"
        />
        <q-route-tab
          to="/about"
          label="About"
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  components: {
  },
  data() {
    return {
    };
  },
};
</script>
