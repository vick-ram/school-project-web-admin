<template>
  <q-header>
    <q-toolbar
      class="text-primary"
      :class="$q.dark.isActive ? 'bg-black' : 'bg-white'"
    >
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="store.toggleDrawer"
        style="color: #34495e; size: 30px"
      />

      <q-toolbar-title
        style="font-weight: bold; font-size: 1.5rem; color: #34495e"
      >
        TITOSSY CLEANING SERVICES
      </q-toolbar-title>

      <div class="q-pl-md">
        <q-btn
          flat
          dense
          round
          icon="dark_mode"
          aria-label="Toggle Dark Mode"
          @click="$emit('toggleDarkMode')"
        />
        <q-btn
          flat
          dense
          round
          icon="notifications"
          aria-label="Notifications"
          class="q-ml-md"
        />
        <q-btn
          flat
          dense
          round
          icon="logout"
          aria-label="Logout"
          @click="logOut"
          class="q-ml-lg"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useStore1 } from 'src/stores/store1';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const store = useStore1();
const $q = useQuasar();
const router = useRouter();

const logOut = () => {
  api.post('/employee/auth/sign_out').then((res) => {
    if (res.data.status === 'success') {
      localStorage.removeItem('token');
      $q.notify({
        message: res.data.message,
        color: 'green',
      });
      router.push({ name: 'sign_in' });
    } else if (res.data.status === 'error') {
      $q.notify({
        message: res.data.error,
        color: 'red',
      });
      console.log(res.data.error);
    }
  });
};
</script>

<style scoped></style>
