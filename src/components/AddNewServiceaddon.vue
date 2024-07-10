<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="addon.name" label="Name" required />
          <q-input
            v-model="addon.description"
            label="Description"
            required
            type="textarea"
          />
          <q-input v-model="addon.price" label="Price" required />
          <q-uploader
            v-model="addon.image"
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

const prop = defineProps(['serviceId']);

const addon = ref({
  name: '',
  description: '',
  price: '',
  image: null as File | null,
});

const onFileAdded = (files: readonly any[]) => {
  if (files.length > 0) {
    addon.value.image = files[0];
  }
};

const onSubmit = async () => {
  const formData = new FormData();
  formData.append('name', addon.value.name);
  formData.append('description', addon.value.description);
  formData.append('price', formatPrice(addon.value.price));
  if (addon.value.image) {
    formData.append('image', addon.value.image);
  }
  try {
    const response = await api.postForm(
      `/service/${prop.serviceId}/addon`,
      formData
    );
    if (response.data.status === 'success') {
      $q.notify({
        message: response.data.message,
        color: 'green',
      });
      serviceStore.fetchServiceAddons(prop.serviceId);
      serviceStore.serviceaddonDialog = false;
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
