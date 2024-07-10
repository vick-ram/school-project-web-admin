<template>
  <div class="q-pa-md">
    <q-table
      class="table-header"
      title="Services"
      :rows="services"
      :columns="columns"
      row-key="name"
      :loading="loading"
      :filter="filter"
      hide-bottom
      :rows-per-page-options="[-1]"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          v-model="filter"
          debounce="200"
          placeholder="Search"
          class="text-white"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          icon="add"
          flat
          round
          dense
          class="q-ml-md"
          @click="openDialog"
        />
      </template>
      <template #body="props">
        <q-tr
          :props="props"
          :class="{ 'row-expanded': expandedRow === props.row }"
        >
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="description" :props="props">
            <span
              @click.stop="toggleRowExpansion(props.row)"
              class="description-content"
              :class="{ expanded: expandedRow === props.row }"
            >
              {{
                expandedRow === props.row
                  ? props.row.description
                  : truncateText(props.row.description, 8)
              }}
            </span>
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
          </q-td>
          <q-td key="imageUrl" :props="props">
            <q-img :src="props.row.imageUrl" width="100" height="50" />
          </q-td>
          <q-td key="createdAt" :props="props">
            {{ props.row.createdAt }}
          </q-td>
          <q-td key="updatedAt" :props="props">
            {{ props.row.updatedAt }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn icon="more_vert" flat round dense>
              <q-menu
                ref="menu"
                :value="props.row.menuOpen"
                @input="(val: boolean) => props.row.menuOpen = val"
                anchor="top right"
                self="top right"
              >
                <q-list>
                  <q-item
                    clickable
                    v-ripple
                    @click="viewDetails(props.row)"
                    v-close-popup
                  >
                    <q-item-section>Addons</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-ripple
                    @click="editRow(props.row)"
                    v-close-popup
                  >
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-ripple
                    @click="deleteRow(props.row)"
                    v-close-popup
                  >
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="serviceStore.serviceDialog">
      <AddNewService />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { useServiceStore } from 'src/stores/serviceStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AddNewService from 'src/components/AddNewService.vue';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

const loading = ref(true);
const $q = useQuasar();
const expandedRow = ref<Service | null>(null);
const serviceStore = useServiceStore();
const services = ref<Service[]>([]);
const filter = ref('');
const router = useRouter();

const openDialog = () => {
  serviceStore.serviceDialog = true;
};

const viewDetails = (service: Service) => {
  router.push({ name: 'serviceDetails', params: { id: service.id } });
};
const editRow = (service: Service) => {
  try {
  } catch (error) {}
};
const deleteRow = (service: Service) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Confirm you want to delete service',
    ok: {
      label: 'Confirm',
      color: 'negative',
    },
    cancel: {
      label: 'Cancel',
      color: 'posititve',
    },
  }).onOk(async () => {
    try {
      const response = await api.delete(`/service/${service.id}`);
      if (response.data.status === 'success') {
        services.value = services.value.filter(
          (serv) => serv.id !== service.id
        );
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
        await serviceStore.fetchServices();
      } else if (response.data.status === 'error') {
        throw new Error(response.data.error);
      }
    } catch (error) {
      $q.notify({
        message: String(error),
        color: 'red',
      });
    }
  });
};

const truncateText = (text: string, maxWords: number) => {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
};

const toggleRowExpansion = (row: Service) => {
  if (expandedRow.value === row) {
    expandedRow.value = null;
  } else {
    expandedRow.value = row;
  }
};

onMounted(async () => {
  await serviceStore.fetchServices();
  const storeServices = serviceStore.services;
  if (storeServices) {
    services.value = storeServices;
  }
  loading.value = false;
});

const columns: QTableColumn<Service | any>[] = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'description',
    required: true,
    label: 'Description',
    align: 'left',
    field: 'description',
    sortable: true,
  },
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'left',
    field: 'price',
    sortable: true,
  },
  {
    name: 'imageUrl',
    required: true,
    label: 'Image',
    align: 'left',
    field: 'imageUrl',
    sortable: false,
  },
  {
    name: 'createdAt',
    required: true,
    label: 'CreatedAt',
    align: 'left',
    field: 'createdAt',
    sortable: true,
  },
  {
    name: 'updatedAt',
    required: true,
    label: 'UpdatedAt',
    align: 'left',
    field: 'updatedAt',
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'center',
    field: 'Actions',
    sortable: false,
  },
];
</script>

<style scoped>
.q-table .q-td:last-child {
  display: flex;
  justify-content: end;
}

.description-content {
  cursor: pointer;
  display: block;
  max-height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description-content.expanded {
  max-height: none;
  white-space: normal;
}

.row-expanded .description-content {
  max-height: none;
  white-space: normal;
}
</style>
