<template>
  <div q-pa-md>
    <q-table
      class="table-header"
      flat
      bordered
      :rows="customers"
      :columns="columns"
      row-key="name"
      title="Customers"
      :filter="search"
      :loading="loading"
      hide-bottom
      :rows-per-page-options="[-1]"
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
            <q-icon name="search" color="white" />
          </template>
        </q-input>
        <q-btn
          flat
          dense
          color="white"
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
          <q-btn
            flat
            dense
            :color="props.row.status === 'PENDING' ? 'orange' : 'green'"
            @click="updateStatus(props.row)"
          >
            {{ props.row.status }}
          </q-btn>
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
          <q-icon
            name="edit"
            size="sm"
            color="primary"
            class="cursor-pointer"
            @click="openEditDialog(props.row)"
          />
          <q-icon
            name="delete"
            size="sm"
            color="negative"
            @click="deleteCustomer(props.row)"
            class="q-ml-md cursor-pointer"
          />
        </q-td>
      </template>
    </q-table>
    <AddNewCustomer />
    <template>
      <q-dialog v-model="editDialog">
        <div style="min-width: 400px">
          <q-card>
            <q-card-section>
              <q-form @submit.prevent="onSubmit" class="q-pa-md q-gutter-md">
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
                <q-btn color="secondary" label="Update" @click="onSubmit" />
                <q-btn
                  color="secondary"
                  label="Cancel"
                  @click="closeEditDialog"
                />
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { QTableColumn } from 'quasar';
import { useStore1 } from 'src/stores/store1';
import { useCustomerStore } from 'src/stores/customerStore';
import AddNewCustomer from 'src/components/AddNewCustomer.vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
const editDialog = ref(false);

const store = useStore1();
const $q = useQuasar();
const search = ref('');
const customers = ref<Customer[]>([]);
const loading = ref(true);
const customerStore = useCustomerStore();
const editedIndex = ref(-1);
const customerId = ref<string | null>(null);

const openEditDialog = (customer: Customer) => {
  const fullName = customer.fullName.split(' ');
  editedIndex.value = customers.value.indexOf(customer);
  customerId.value = customer.id;
  customerStore.customer = {
    username: customer.username,
    firstName: fullName[0],
    lastName: fullName.slice(1).join(' '),
    phone: customer.phone,
    email: customer.email,
    password: '',
  };
  editDialog.value = true;
};

watch(
  editDialog,
  (newValue) => {
    if (!newValue) {
      customerStore.resetCustomer();
    }
  },
  { immediate: true }
);

const onSubmit = () => {
  if (!customerId.value) return;
  console.log(`This is customer id: ${customerId.value}`);
  api
    .put(`/customer/${customerId.value}`, customerStore.customer)
    .then((response) => {
      if (response.data.status === 'success') {
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
        customerStore.fetchCustomers();
        customerStore.resetCustomer();
        editDialog.value = false;
      } else if (response.data.status === 'error') {
        console.log(response.data.error);
        throw new Error(response.data.error);
      }
    })
    .catch((e) => {
      console.log(e);
      $q.notify({
        message: String(e),
        color: 'red',
      });
    });
};
const closeEditDialog = () => {
  editDialog.value = false;
  customerStore.resetCustomer();
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
          customerStore.fetchCustomers();
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

const updateStatus = (customer: Customer) => {
  const newStatus = customer.status === 'PENDING' ? 'APPROVED' : 'PENDING';
  api
    .patch(`/customer/${customer.id}`, { status: newStatus })
    .then((response) => {
      if (response.data.status === 'success') {
        customer.status = newStatus;
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
        customerStore.fetchCustomers();
      } else if (response.data.status === 'error') {
        throw new Error(response.data.error);
      }
    })
    .catch((e) => {
      console.log(e);
      $q.notify({
        message: String(e),
        color: 'red',
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
