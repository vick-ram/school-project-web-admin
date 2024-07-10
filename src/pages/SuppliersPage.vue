<template>
  <div class="q-pa-md">
    <q-table
      class="table-header"
      flat
      bordered
      :rows="suppliers"
      :columns="columns"
      row-key="name"
      title="Suppliers"
      :loading="loading"
      :filter="search"
      hide-bottom
      :rows-per-page-options="[-1]"
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
            <q-icon name="search" color="white" />
          </template>
        </q-input>
        <q-btn
          flat
          round
          dense
          color="white"
          icon="person_add"
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
            @click="updateSupplierStatus(props.row)"
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
            color="green"
            size="sm"
            @click="openEditDialog(props.row)"
            class="cursor-pointer"
          />
          <q-icon
            name="delete"
            color="red"
            size="sm"
            class="q-ml-sm cursor-pointer"
            @click="deleteSupplier(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="useStore.dialogOpen">
      <AddNewSupplier />
    </q-dialog>

    <q-dialog v-model="editDialog">
      <div class="q-pa-md" style="min-width: 400px">
        <q-card>
          <q-card-section>
            <q-form @submit.prevent="updateSupplier" class="q-gutter-md">
              <h6>Update Supplier</h6>
              <q-input
                v-model="store.supplier.firstName"
                label="First Name"
                type="text"
                required
              />
              <q-input
                v-model="store.supplier.lastName"
                label="Last Name"
                type="text"
                required
              />
              <q-input
                v-model="store.supplier.phone"
                label="Phone"
                type="text"
                required
              />
              <q-input
                v-model="store.supplier.address"
                label="Address"
                type="text"
                required
              />
              <q-input
                v-model="store.supplier.email"
                label="Email"
                type="email"
                required
              />
              <q-input
                v-model="store.supplier.password"
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
              label="Update"
              @click="updateSupplier"
            />
            <q-btn
              class="create-btn"
              dense
              color="secondary"
              label="Cancel"
              @click="editDialog = false"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useSupplierStore } from 'src/stores/supplierStore';
import { onMounted, ref, watch } from 'vue';
import { QTableColumn, useQuasar } from 'quasar';
import AddNewSupplier from 'src/components/AddNewSupplier.vue';
import { useStore1 } from 'src/stores/store1';
import { api } from 'src/boot/axios';

const store = useSupplierStore();
const suppliers = ref<Supplier[]>([]);
const loading = ref(true);
const search = ref('');
const editDialog = ref(false);
const showPassword = ref(false);
const useStore = useStore1();
const editedIndex = ref(-1);
const supplierId = ref<string | null>(null);
const $q = useQuasar();

const openEditDialog = (supplier: Supplier) => {
  const supplierFullName = supplier.fullName.split(' ');
  editedIndex.value = suppliers.value.indexOf(supplier);
  supplierId.value = supplier.id;
  store.supplier = {
    firstName: supplierFullName[0],
    lastName: supplierFullName.slice(1).join(' '),
    phone: supplier.phone,
    address: supplier.address,
    email: supplier.email,
    password: 'Password1234',
  };
  editDialog.value = true;
};

const updateSupplier = () => {
  api
    .put(`/supplier/${supplierId.value}`, store.supplier)
    .then((response) => {
      if (response.data.status === 'success') {
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
        store.fetchSuppliers();
        store.resetSupplier();
        editDialog.value = false;
      } else if (response.data.status === 'error') {
        console.log(response.data.error);
        throw new Error(response.data.error);
      }
    })
    .catch((error) => {
      console.log(error);
      $q.notify({
        message: String(error.message),
        color: 'red',
      });
    });
};

watch(editDialog, (newValue) => {
  if (!newValue) {
    store.resetSupplier();
  }
});

const deleteSupplier = (supplier: Supplier) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Confirm you want to delete supplier',
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
      .delete(`/supplier/${supplier.id}`)
      .then((response) => {
        if (response.data.status === 'success') {
          suppliers.value ===
            suppliers.value.filter((sup) => {
              sup.id !== supplier.id;
            });
          $q.notify({
            message: response.data.message,
            color: 'green',
          });
        } else if (response.data.status === 'error') {
          throw new Error(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        $q.notify({
          message: String(error.message),
          color: 'red',
        });
      });
  });
};

const updateSupplierStatus = (supplier: Supplier) => {
  const newStatus = supplier.status === 'PENDING' ? 'APPROVED' : 'PENDING';
  api
    .patch(`/supplier/${supplier.id}`, { status: newStatus })
    .then((response) => {
      if (response.data.status === 'success') {
        supplier.status = newStatus;
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
      } else if (response.data.status === 'error') {
        throw new Error(response.data.error);
      }
    })
    .catch((error) => {
      console.log(error);
      $q.notify({
        message: String(error.message),
        color: 'red',
      });
    });
};

onMounted(async () => {
  await store.fetchSuppliers();
  const storeSuppliers = store.suppliers;
  if (storeSuppliers) {
    suppliers.value = storeSuppliers;
  }
  loading.value = false;
});

const columns: QTableColumn<Supplier>[] | any = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: 'id',
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
    align: 'left',
    field: 'actions',
    sortable: false,
  },
];
</script>

<style scoped>
.q-card-actions-centered {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.create-btn {
  flex: 0 0 30%;
  max-width: 30%;
  padding: 8px;
  margin: 8px;
}
</style>
