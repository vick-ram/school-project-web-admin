<template>
  <q-dialog v-model="store.dialogOpen">
    <div style="min-width: 400px">
      <q-card>
        <q-card-section>
          <q-form @submit.prevent="onSubmit" class="q-pa-md q-gutter-md">
            <q-input label="Username" v-model="user.username" />
            <q-input label="first Name" v-model="user.firstName" />
            <q-input label="Last Name" v-model="user.lastName" />
            <q-input label="Phone" v-model="user.phone" type="text" required />
            <q-input type="email" label="Email" v-model="user.email" />
            <q-input type="password" label="Password" v-model="user.password" />
            <q-btn color="primary" label="Create" @click="onSubmit" />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { useStore1 } from 'src/stores/store1';
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const store = useStore1();
const $q = useQuasar();
const user = ref({
  username: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
});
const onSubmit = () => {
  api
    .post('/customer/auth/sign_up', user.value)
    .then((response) => {
      if (response.data.status === 'success') {
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
        store.dialogOpen = false;
        user.value = {
          username: '',
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: '',
        };
      } else if (response.data.status === 'error') {
        throw new Error(response.data.error);
      }
    })
    .catch((e) => {
      $q.notify({
        message: e,
        color: 'red',
      });
    });
};
</script>
