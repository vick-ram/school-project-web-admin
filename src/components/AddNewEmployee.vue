<template>
  <div class="q-pa-md" style="min-width: 400px">
    <q-card>
      <q-card-section>
        <q-form
          @submit.prevent="employeeStore.createEmployee"
          class="q-gutter-md"
        >
          <q-input
            v-model="employeeStore.employee.username"
            type="text"
            label="Username"
            required
          />
          <q-input
            v-model="employeeStore.employee.firstName"
            type="text"
            label="First Name"
            required
          />
          <q-input
            v-model="employeeStore.employee.lastName"
            type="text"
            label="Last Name"
            required
          />
          <q-select
            v-model="employeeStore.employee.gender"
            :options="gender"
            label="Gender"
          />
          <q-input
            v-model="employeeStore.employee.email"
            type="email"
            label="Email"
            required
          />
          <q-input
            v-model="employeeStore.employee.password"
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
            v-model="employeeStore.employee.phone"
            type="text"
            label="Phone"
            required
          />
          <q-select
            v-model="employeeStore.employee.role"
            :options="roles"
            label="Role"
          />
          <q-btn
            label="create"
            color="secondary"
            dense
            @click="employeeStore.createEmployee"
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
import { useEmployeeStrore } from 'src/stores/employeeStore';

const $q = useQuasar();
const useStore = useStore1();
const employeeStore = useEmployeeStrore();
const showPassword = ref(false);
const roles = ['MANAGER', 'FINANCE', 'SUPERVISOR', 'INVENTORY', 'CLEANER'];
const gender = ['MALE', 'FEMALE', 'OTHER', 'NOT_SPECIFIED'];
</script>

<style scoped>
.gender input {
  text-transform: uppercase;
}
</style>
