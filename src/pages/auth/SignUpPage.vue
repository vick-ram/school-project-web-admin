<!-- src/pages/Login.vue -->
<template>
  <div class="q-pa-md">
    <q-card class="auth-card" style="margin: 40px auto">
      <q-card-section align="center">
        <div class="text-h6">Sign Up</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="admin.username" label="Username" class="q-mb-md" />
        <q-input v-model="admin.firstName" label="First Name" class="q-mb-md" />
        <q-input v-model="admin.lastName" label="Last Name" class="q-mb-md" />
        <q-input v-model="admin.phone" label="Phone" class="q-mb-md" />
        <q-input
          v-model="admin.gender"
          label="gender"
          class="q-mb-md"
          placeholder="i.e MALE"
        />
        <q-input
          class="q-mb-md"
          v-model="admin.email"
          label="Email"
          @input="validateEmail"
        />
        <p v-if="emailError" class="error">{{ emailError }}</p>
        <q-input
          class="q-mb-md"
          v-model="admin.password"
          label="Password"
          type="password"
        />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </q-card-section>

      <q-card-actions align="center" class="items-center">
        <q-btn
          unelevated
          rounded
          color="primary"
          label="Sign Up"
          @click="signUp"
          no-caps
          style="padding: 2px 10px"
          class="q-mb-sm"
        />
        <q-btn
          flat
          rounded
          color="secondary"
          label="Sign In"
          @click="$router.push({ name: 'sign_in' })"
          style="padding: 2px 10px"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const passwordError = ref(null);
const emailError = ref(null);
const $q = useQuasar();
const router = useRouter();

const admin = ref({
  username: '',
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  password: '',
  phone: '',
  role: 'ADMIN',
  availability: null,
});

const validateEmail = () => {
  if (!admin.value.email) {
    emailError.value = 'Please enter an email';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(admin.value.email)) {
    emailError.value = 'Invalid email format';
  } else {
    emailError.value = '';
  }
};

const validatePassword = () => {
  if (!admin.value.password) {
    passwordError.value = 'Please enter a password';
  } else if (admin.value.password.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long';
  } else {
    passwordError.value = '';
  }
};
const signUp = () => {
  validateEmail();
  validatePassword();

  api
    .post('/employee/auth/sign_up', admin.value)
    .then((response) => {
      console.log(response);
      if (response.data.status == 'success') {
        $q.notify({
          message: response.data.message,
          color: 'green-4',
        });
        router.push({ name: 'sign_in' });
      } else if (response.data.status == 'error') {
        throw new Error(response.data.error);
      }
    })
    .catch((e) => {
      $q.notify({
        message: e,
        color: 'red',
      });
      console.log(e);
    });
};
</script>

<style scoped>
.auth-card {
  width: 350px;
}
.error {
  color: red;
  font-size: 12px;
}
</style>
