<template>
  <div class="q-pa-md">
    <q-table
      :columns="columns"
      :rows="serviceAddons"
      title="Service Addons"
      class="table-header"
      :filter="filter"
      flat
      hide-bottom
      :rows-per-page-options="[-1]"
    >
      <template #top-right>
        <q-input
          v-model="filter"
          flat
          dense
          :borderless="true"
          debounce="200"
          placeholder="Search"
        >
          <template #append>
            <q-icon name="search" color="white" />
          </template>
        </q-input>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="serviceId" :props="props">
            {{ props.row.serviceId }}
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
            <q-btn round dense flat icon="more_vert">
              <q-menu
                ref="menu"
                :value="props.row.menuOpen"
                @input="(val: boolean) => props.row.menuOpen = val"
                anchor="top right"
                self="top right"
              >
                <q-list>
                  <q-item clickable v-ripple @click="create" v-close-popup>
                    <q-item-section>Create</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple @click="edit" v-close-popup>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-ripple
                    @click="deleteAddon(props.row)"
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
      <template #body-cell-actions>
        <q-btn icon="more_vert" flat round dense></q-btn>
      </template>
    </q-table>
    <q-dialog v-model="serviceStore.serviceaddonDialog">
      <AddNewServiceaddon :serviceId="serviceId" />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useServiceStore } from 'src/stores/serviceStore';
import { onMounted, ref, watch } from 'vue';
import { QTableColumn } from 'quasar';
import AddNewServiceaddon from './AddNewServiceaddon.vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const route = useRoute();
const $q = useQuasar();
const serviceStore = useServiceStore();
const serviceId = route.params.id;
const service = ref<Service | null>(null);
const serviceAddons = ref<ServiceAddon[]>([]);
const loading = ref(false);
const filter = ref('');
const expandedRow = ref<ServiceAddon | null>(null);

const create = () => {
  serviceStore.serviceaddonDialog = true;
};
const edit = () => {
  console.log('creating');
};
const deleteAddon = (addon: ServiceAddon) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Confirm yo want to delete addon',
    ok: {
      label: 'Confirm',
      color: 'negative',
    },
    cancel: {
      label: 'Cancel',
      color: 'primary',
    },
  }).onOk(async () => {
    try {
      const response = await api.delete(
        `/service/${serviceId}/addon/${addon.id}`
      );
      if (response.data.status === 'success') {
        serviceAddons.value = serviceAddons.value.filter(
          (serviceAddon) => serviceAddon.id !== addon.id
        );
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
        await serviceStore.fetchServiceAddons(serviceId as string);
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

onMounted(async () => {
  loading.value = true;
  await serviceStore.fetchServiceAddons(serviceId as string);
  const storeAddons = serviceStore.serviceAddons;
  if (storeAddons) {
    serviceAddons.value = storeAddons;
  }
});

watch(
  () => serviceStore.service,
  (newService) => {
    service.value = newService;
  }
);

const truncateText = (text: string, maxWords: number) => {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
};

const toggleRowExpansion = (row: ServiceAddon) => {
  if (expandedRow.value === row) {
    expandedRow.value = null;
  } else {
    expandedRow.value = row;
  }
};

const columns: QTableColumn<ServiceAddon | any>[] = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'serviceId',
    required: true,
    label: 'SERVICE ID',
    align: 'left',
    field: 'serviceId',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'NAME',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'description',
    required: true,
    label: 'DESCRIPTION',
    align: 'left',
    field: 'description',
    sortable: true,
  },
  {
    name: 'price',
    required: true,
    label: 'PRICE',
    align: 'left',
    field: 'price',
    sortable: true,
  },
  {
    name: 'imageUrl',
    required: true,
    label: 'IMAGE',
    align: 'left',
    field: 'imageUrl',
    sortable: false,
  },
  {
    name: 'createdAt',
    required: true,
    label: 'CREATED AT',
    align: 'left',
    field: 'createdAt',
    sortable: true,
  },
  {
    name: 'updatedAt',
    required: true,
    label: 'UPDATED AT',
    align: 'left',
    field: 'updatedAt',
    sortable: true,
  },
  {
    name: 'actions',
    required: true,
    label: 'ACTIONS',
    align: 'center',
    field: 'Actions',
    sortable: false,
  },
];
</script>

<style scoped>
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
