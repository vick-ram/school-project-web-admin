<template>
  <div class="q-pa-md" style="min-width: 400px">
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="createSupplier" class="q-gutter-md">
          <q-input
            v-model="supplier.username"
            label="Username"
            type="text"
            required
          />
          <q-input
            v-model="supplier.firstName"
            label="First Name"
            type="text"
            required
          />
          <q-input
            v-model="supplier.lastName"
            label="Last Name"
            type="text"
            required
          />
          <q-input
            v-model="supplier.phone"
            label="Phone"
            type="text"
            required
          />
          <q-input
            v-model="supplier.company"
            label="Company"
            type="text"
            required
          />
          <q-input
            v-model="supplier.address.county"
            label="County"
            type="text"
            required
          />
          <q-input
            v-model="supplier.address.region"
            label="Region"
            type="text"
            required
          />
          <q-input
            v-model="supplier.address.postalCode"
            label="Postal Code"
            type="text"
            required
          />
          <q-input
            v-model="supplier.email"
            label="Email"
            type="email"
            required
          />
          <q-input
            v-model="supplier.password"
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
          color="primary"
          label="Create"
          @click="createSupplier"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { useStore1 } from 'src/stores/store1';

const $q = useQuasar();
const store = useStore1();

const supplier = ref({
  username: '',
  firstName: '',
  lastName: '',
  phone: '',
  company: '',
  address: {
    county: '',
    region: '',
    postalCode: '',
  },
  email: '',
  password: '',
});
const showPassword = ref(false);

const createSupplier = () => {
  api
    .post('/supplier/auth/sign_up', supplier.value)
    .then((response) => {
      if (response.data.status === 'success') {
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
        store.dialogOpen = false;
        supplier.value = {
          username: '',
          firstName: '',
          lastName: '',
          phone: '',
          company: '',
          address: {
            county: '',
            region: '',
            postalCode: '',
          },
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
