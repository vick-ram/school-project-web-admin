<template>
  <q-dialog v-model="store.dialogOpen">
    <div style="min-width: 400px">
      <q-card>
        <q-card-section>
          <q-form
            @submit.prevent="customerStore.createCustomer"
            class="q-pa-md q-gutter-md"
          >
            <q-input
              label="Username"
              v-model="customerStore.customer.username"
            />
            <q-input
              label="first Name"
              v-model="customerStore.customer.firstName"
            />
            <q-input
              label="Last Name"
              v-model="customerStore.customer.lastName"
            />
            <q-input
              label="Phone"
              v-model="customerStore.customer.phone"
              type="text"
              required
            />
            <q-input
              type="email"
              label="Email"
              v-model="customerStore.customer.email"
            />
            <q-input
              type="password"
              label="Password"
              v-model="customerStore.customer.password"
            />
            <q-btn
              color="primary"
              label="Create"
              @click="customerStore.createCustomer"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { useStore1 } from 'src/stores/store1';
import { useCustomerStore } from 'src/stores/customerStore';

const store = useStore1();
const customerStore = useCustomerStore();
</script>
