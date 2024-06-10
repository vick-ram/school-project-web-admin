<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      :rows="suppliers"
      :columns="columns"
      row-key="name"
      title="Suppliers"
      :loading="loading"
      :filter="search"
    >
      <template v-slot:top-right>
        <q-input
          v-model="search"
          flat
          borderless
          debounce="300"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          flat
          dense
          label="Create"
          @click="useStore.openDialog"
          class="q-ml-md"
        />
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          {{ props.row.id }}
        </q-td>
      </template>
      <template v-slot:body-cell-username="props">
        <q-td :props="props">
          {{ props.row.username }}
        </q-td>
      </template>
      <template v-slot:body-cell-fullName="props">
        <q-td :props="props">
          {{ props.row.fullName }}
        </q-td>
      </template>
      <template v-slot:body-cell-phone="props">
        <q-td :props="props">
          {{ props.row.phone }}
        </q-td>
      </template>
      <template v-slot:body-cell-company="props">
        <q-td :props="props">
          {{ props.row.company }}
        </q-td>
      </template>
      <template v-slot:body-cell-address="props">
        <q-td :props="props">
          {{ props.row.address }}
        </q-td>
      </template>
      <template v-slot:body-cell-email="props">
        <q-td :props="props">
          {{ props.row.email }}
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          {{ props.row.status }}
        </q-td>
      </template>
      <template v-slot:body-cell-createdAt="props">
        <q-td :props="props">
          {{ props.row.createdAt }}
        </q-td>
      </template>
      <template v-slot:body-cell-updatedAt="props">
        <q-td :props="props">
          {{ props.row.updatedAt }}
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="useStore.dialogOpen">
      <AddNewSupplier />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useSupplierStore } from 'src/stores/supplierStore';
import { onMounted, ref } from 'vue';
import { QTableColumn } from 'quasar';
import AddNewSupplier from 'src/components/AddNewSupplier.vue';
import { useStore1 } from 'src/stores/store1';

const store = useSupplierStore();
const suppliers = ref<Supplier[]>([]);
const loading = ref(true);
const search = ref('');

const useStore = useStore1();
onMounted(async () => {
  await store.fetchSuppliers();
  const storeSuppliers = store.suppliers;
  if (storeSuppliers) {
    suppliers.value = storeSuppliers;
  }
  loading.value = false;
});

const columns: QTableColumn<Supplier>[] = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'username',
    required: true,
    label: 'Username',
    align: 'left',
    field: 'username',
    sortable: true,
  },
  {
    name: 'fullName',
    required: true,
    label: 'Full Name',
    align: 'left',
    field: 'fullName',
    sortable: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    align: 'left',
    field: 'phone',
    sortable: true,
  },
  {
    name: 'company',
    label: 'Company',
    align: 'left',
    field: 'company',
    sortable: true,
  },
  {
    name: 'address',
    label: 'Address',
    align: 'left',
    field: 'address',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: 'email',
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: 'status',
    sortable: true,
  },
  {
    name: 'createdAt',
    label: 'Created At',
    align: 'left',
    field: 'createdAt',
    sortable: true,
  },
  {
    name: 'updatedAt',
    label: 'Updated At',
    align: 'left',
    field: 'updatedAt',
    sortable: true,
  },
];
</script>
