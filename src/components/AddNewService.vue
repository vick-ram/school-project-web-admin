<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="service.name" label="Name" required />
          <q-input
            v-model="service.description"
            label="Description"
            required
            type="textarea"
          />
          <q-input v-model="service.price" label="Price" required />
          <q-uploader
            v-model="service.image"
            label="Upload Image"
            accept="image/*"
            :auto-upload="false"
            @added="onFileAdded"
            color="teal"
          />

          <q-btn type="submit" label="Submit" color="teal" />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { useServiceStore } from 'src/stores/serviceStore';
import formatPrice from 'src/composables/formatPrice';

const $q = useQuasar();
const serviceStore = useServiceStore();

const service = ref({
  name: '',
  description: '',
  price: '',
  image: null as File | null,
});

const onFileAdded = (files: readonly any[]) => {
  if (files.length > 0) {
    service.value.image = files[0];
  }
};
const onSubmit = async () => {
  const formData = new FormData();

  formData.append('name', service.value.name);
  formData.append('description', service.value.description);
  formData.append('price', formatPrice(service.value.price));
  if (service.value.image) {
    formData.append('imageUrl', service.value.image);
  }

  try {
    const response = await api.postForm('/service', formData);
    if (response.data.status === 'success') {
      $q.notify({
        message: response.data.message,
        color: 'green',
      });
      serviceStore.fetchServices();
    } else if (response.data.status === 'error') {
      throw new Error(response.data.error);
    }
  } catch (error) {
    console.log(error);
    $q.notify({
      message: String(error),
      color: 'red',
    });
  }
};
</script>
