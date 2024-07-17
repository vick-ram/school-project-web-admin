<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <h4 class="text-weight-medium">Sign In</h4>
        <q-form @submit.prevent="signIn" class="q-gutter-md">
          <q-input v-model="admin.username" type="text" label="username" />
          <q-input v-model="admin.password" type="password" label="password" />
          <q-btn
            label="Sign in"
            type="submit"
            color="primary"
            class="q-ml-sm"
            @click="signIn"
          />
          <div class="row justify-between items-center">
            <p>Do not have an account?</p>
            <q-btn
              flat
              dense
              label="Sign up"
              color="primary"
              @click="$router.push({ name: 'sign_up' })"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
const admin = ref({
  username: '',
  password: '',
});

const router = useRouter();
const $q = useQuasar();

const signIn = () => {
  console.log(admin.value);
  api
    .post('/employee/auth/sign_in', admin.value)
    .then((res) => {
      if (res.data.status === 'success') {
        console.log(res.data.data);
        localStorage.setItem('token', res.data.data);
        $q.notify({
          message: res.data.message,
          color: 'green',
        });
        router.push({ name: 'customer' });
      } else if (res.data.status === 'error') {
        throw new Error(res.data.error);
      }
    })
    .catch((e) => {
      $q.notify({
        message: String(e),
        color: 'red',
      });
    });
};
</script>

<style scoped>
.my-card {
  max-width: 350px;
  margin: 40px auto;
}
</style>
