<template>
  <div class="q-pa-md" style="min-width: 400px">
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="createEmployee" class="q-gutter-md">
          <q-input
            v-model="employee.username"
            type="text"
            label="Username"
            required
          />
          <q-input
            v-model="employee.firstName"
            type="text"
            label="First Name"
            required
          />
          <q-input
            v-model="employee.lastName"
            type="text"
            label="Last Name"
            required
          />
          <q-input
            v-model="employee.gender"
            type="text"
            label="Gender"
            autocapitalize="true"
            required
            class="gender"
          />
          <q-input
            v-model="employee.email"
            type="email"
            label="Email"
            required
          />
          <q-input
            v-model="employee.password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
          <q-input
            v-model="employee.phone"
            type="email"
            label="Gender"
            required
          />
          <q-select v-model="employee.role" :options="roles" label="Gender" />
          <q-btn
            label="create"
            color="secondary"
            dense
            @click="createEmployee"
            style="width: 60%; padding: 8px"
            align="center"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore1 } from 'src/stores/store1';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const employeeStore = useStore1();
const showPassword = ref(false);
const roles = ['MANAGER', 'FINANCE', 'SUPERVISOR', 'INVENTORY', 'CLEANER'];

const employee = ref({
  username: '',
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  password: '',
  phone: '',
  role: '',
  availability: null,
});

const createEmployee = () => {
  api
    .post('/employee/auth/sign_up', employee.value)
    .then((response) => {
      if (response.data.status === 'success') {
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
        employeeStore.dialogOpen = false;
        employee.value = {
          username: '',
          firstName: '',
          lastName: '',
          gender: '',
          email: '',
          password: '',
          phone: '',
          role: '',
          availability: null,
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

<style scoped>
.gender input {
  text-transform: uppercase;
}
</style>
