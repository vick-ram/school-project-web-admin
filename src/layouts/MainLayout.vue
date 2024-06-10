<template>
  <div q-pa-md>
    <q-layout view="lHh LpR lff">
      <Header @toggleDarkMode="toggleDarkMode" />
      <Sidebar />

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import Header from '../components/HeaderComponent.vue';
import Sidebar from '../components/SidebarComponent.vue';
import { useQuasar } from 'quasar';

const drawer = ref(false);
const $q = useQuasar();
const toggleDarkMode = () => {
  $q.dark.toggle();
};
provide('drawer', drawer);
</script>
