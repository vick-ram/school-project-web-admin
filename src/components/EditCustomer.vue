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

<script setup lang="ts">
import { ref } from 'vue';
import { useStore1 } from 'src/stores/store1';

const store = useStore1();

const user = ref({
  username: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
});

const emit = defineEmits(['save']);
const onSubmit = () => {
  emit('save');
};
</script>
