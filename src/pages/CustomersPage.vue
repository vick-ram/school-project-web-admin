<template>
  <div q-pa-md>
    <q-table
      flat
      bordered
      :rows="customers"
      :columns="columns"
      row-key="name"
      title="Customers"
      :filter="search"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="search"
          placeholder="Search"
          class="q-mr-md"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          dense
          color="primary"
          round
          icon="person_add"
          class="q-pa-md"
          @click="store.openDialog"
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
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            label="Edit"
            flat
            dense
            size="sm"
            color="primary"
            @click="openEditDialog(props.row)"
          />
          <q-btn
            label="Delete"
            flat
            dense
            size="sm"
            color="negative"
            @click="deleteCustomer(props.row)"
            class="q-ml-sm"
          />
        </q-td>
      </template>
    </q-table>
    <AddNewCustomer />
    <EditCustomer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { QTableColumn } from 'quasar';
import { useStore1 } from 'src/stores/store1';
import { useCustomerStore } from 'src/stores/customerStore';
import AddNewCustomer from 'src/components/AddNewCustomer.vue';
import EditCustomer from 'src/components/EditCustomer.vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const store = useStore1();
const $q = useQuasar();
const search = ref('');
const customers = ref<Customer[]>([]);
const loading = ref(true);
const customerStore = useCustomerStore();

const editedCustomer = ref<Customer | null>(null);

const openEditDialog = (customer: Customer) => {
  editedCustomer.value = Object.assign({}, customer);
  store.openDialog();
};

const deleteCustomer = (customer: Customer) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Confirm that you want to delete this customer?',
    ok: {
      label: 'Confirm',
      color: 'negative',
    },
    cancel: {
      label: 'Cancel',
      color: 'primary',
    },
  }).onOk(() => {
    api
      .delete(`/customer/${customer.id}`)
      .then((response) => {
        if (response.data.status === 'success') {
          customers.value = customers.value.filter(
            (cus) => cus.id !== customer.id
          );
          $q.notify({
            message: response.data.message,
            color: 'green',
          });
        } else if (response.data.status === 'error') {
          throw new Error(response.data.error);
        }
      })
      .catch((e) => {
        $q.notify({
          message: String(e),
          color: 'red',
        });
        console.log(e);
      });
  });
};

onMounted(async () => {
  await customerStore.fetchCustomers();
  const storeCustomers = customerStore.customers;
  if (storeCustomers) {
    customers.value = storeCustomers;
  }
  loading.value = false;
});

const columns: QTableColumn<Customer | any>[] = [
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
  {
    name: 'actions',
    label: 'Actions',
    align: 'center',
    field: 'actions',
    sortable: false,
  },
];
</script>
