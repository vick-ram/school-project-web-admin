<template>
  <div class="q-pa-md" style="min-width: 400px">
    <q-card>
      <q-card-section>
        <q-form
          @submit.prevent="supplierStore.createSupplier"
          class="q-gutter-md"
        >
          <q-input
            v-model="supplierStore.supplier.firstName"
            label="First Name"
            type="text"
            required
          />
          <q-input
            v-model="supplierStore.supplier.lastName"
            label="Last Name"
            type="text"
            required
          />
          <q-input
            v-model="supplierStore.supplier.phone"
            label="Phone"
            type="text"
            required
          />
          <q-input
            v-model="supplierStore.supplier.email"
            label="Email"
            type="email"
            required
          />
          <q-input
            v-model="supplierStore.supplier.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            required
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          class="create-btn"
          dense
          color="secondary"
          label="Create Supplier"
          @click="supplierStore.createSupplier"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSupplierStore } from 'src/stores/supplierStore';

const supplierStore = useSupplierStore();
const showPassword = ref(false);
</script>

<style scoped>
.q-card-actions-centered {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.create-btn {
  flex: 0 0 60%;
  max-width: 60%;
  padding: 8px;
}
</style>
