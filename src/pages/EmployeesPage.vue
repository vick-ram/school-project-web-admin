<template>
  <div class="q-pa-md">
    <q-table
      class="table-header"
      flat
      bordered
      :rows="employees"
      :columns="columns"
      :loading="loading"
      row-key="name"
      title="Employees"
      :filter="search"
      hide-bottom
      :rows-per-page-options="[-1]"
    >
      <template v-slot:top-right>
        <q-input
          v-model="search"
          placeholder="Search"
          borderless
          dense
          debounce="300"
        >
          <template v-slot:append>
            <q-icon name="search" color="white" />
          </template>
        </q-input>
        <q-btn
          flat
          dense
          icon="person_add"
          round
          color="white"
          class="q-ml-sm"
          @click="useStore.openDialog"
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
      <template v-slot:body-cell-gender="props">
        <q-td :props="props">
          {{ props.row.gender }}
        </q-td>
      </template>
      <template v-slot:body-cell-email="props">
        <q-td :props="props">
          {{ props.row.email }}
        </q-td>
      </template>
      <template v-slot:body-cell-phone="props">
        <q-td :props="props">
          {{ props.row.phone }}
        </q-td>
      </template>
      <template v-slot:body-cell-role="props">
        <q-td :props="props">
          {{ props.row.role }}
        </q-td>
      </template>
      <template v-slot:body-cell-availability="props">
        <q-td :props="props">
          {{ props.row.availability }}
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
            color="primary"
            class="cursor-pointer"
            size="sm"
            @click="openEditDialog(props.row)"
          />
          <q-icon
            name="delete"
            color="negative"
            class="cursor-pointer q-ml-md"
            size="sm"
            @click="deleteEmployee(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="useStore.dialogOpen">
      <AddNewEmployee />
    </q-dialog>
    <q-dialog v-model="editDialog">
      <div class="q-pa-md" style="min-width: 400px">
        <q-card>
          <q-card-section>
            <q-form @submit.prevent="store.createEmployee" class="q-gutter-md">
              <q-input
                v-model="store.employee.username"
                type="text"
                label="Username"
                required
              />
              <q-input
                v-model="store.employee.firstName"
                type="text"
                label="First Name"
                required
              />
              <q-input
                v-model="store.employee.lastName"
                type="text"
                label="Last Name"
                required
              />
              <q-select
                v-model="store.employee.gender"
                :options="gender"
                label="Gender"
              />
              <q-input
                v-model="store.employee.email"
                type="email"
                label="Email"
                required
              />
              <q-input
                v-model="store.employee.password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
              <q-input
                v-model="store.employee.phone"
                type="email"
                label="Gender"
                required
              />
              <q-select
                v-model="store.employee.role"
                :options="roles"
                label="Role"
              />
              <q-btn
                label="Update"
                color="secondary"
                dense
                @click="updateEmployee"
                style="width: 30%; padding: 8px"
                align="center"
              />
              <q-btn
                label="cancel"
                color="secondary"
                dense
                @click="editDialog = false"
                style="width: 30%; padding: 8px"
                align="center"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue';
import { useEmployeeStrore } from 'src/stores/employeeStore';
import { QTableColumn, useQuasar } from 'quasar';
import { useStore1 } from 'src/stores/store1';
import AddNewEmployee from 'src/components/AddNewEmployee.vue';
import { api } from 'src/boot/axios';

const store = useEmployeeStrore();
const employees = ref<Employee[]>([]);
const loading = ref(true);
const search = ref('');
const useStore = useStore1();
const editDialog = ref(false);
const editedIndex = ref(-1);
const employeeId = ref<string | null>(null);
const showPassword = ref(false);
const $q = useQuasar();

const roles = ['MANAGER', 'FINANCE', 'SUPERVISOR', 'INVENTORY', 'CLEANER'];
const gender = ['MALE', 'FEMALE', 'OTHER', 'NOT_SPECIFIED'];

const openEditDialog = (employee: Employee) => {
  const fullName = employee.fullName.split(' ');

  editedIndex.value = employees.value.indexOf(employee);
  employeeId.value = employee.id;
  store.employee = {
    username: employee.username,
    firstName: fullName[0],
    lastName: fullName.slice(1).join(' '),
    gender: employee.gender,
    email: employee.email,
    password: '',
    phone: employee.phone,
    role: employee.role,
    availability: null,
  };

  editDialog.value = true;
};

const updateEmployee = () => {
  api
    .put(`/employee/${employeeId.value}`, store.employee)
    .then((response) => {
      if (response.data.status === 'success') {
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
        store.resetEmployee();
        editDialog.value = false;
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

const deleteEmployee = (employee: Employee) => {
  $q.dialog({
    title: 'Confrim',
    message: 'Confirm you want to delete this employee',
    ok: {
      label: 'Confirm',
      color: 'primary',
    },
    cancel: {
      label: 'Cancel',
      color: 'negative',
    },
  }).onOk(() => {
    api
      .delete(`/employee/${employee.id}`)
      .then((response) => {
        if (response.data.status === 'success') {
          employees.value = employees.value.filter((empl) => {
            empl.id !== employee.id;
          });
          store.fetchEmployees();
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

watch(editDialog, (newValue) => {
  if (!newValue) {
    store.resetEmployee();
  }
});

onMounted(async () => {
  await store.fetchEmployees();
  const storeEmployees = store.employees;
  if (storeEmployees) {
    employees.value = storeEmployees;
  }
  loading.value = false;
});

const columns: QTableColumn<Employee>[] | any = [
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
    label: 'USERNAME',
    align: 'left',
    field: 'username',
    sortable: true,
  },
  {
    name: 'fullName',
    required: true,
    label: 'NAME',
    align: 'left',
    field: 'fullName',
    sortable: true,
  },
  {
    name: 'gender',
    required: true,
    label: 'GENDER',
    align: 'left',
    field: 'gender',
    sortable: true,
  },
  {
    name: 'email',
    required: true,
    label: 'EMAIL',
    align: 'left',
    field: 'email',
    sortable: true,
  },
  {
    name: 'phone',
    required: true,
    label: 'PHONE',
    align: 'left',
    field: 'phone',
    sortable: true,
  },
  {
    name: 'role',
    required: true,
    label: 'ROLE',
    align: 'left',
    field: 'role',
    sortable: true,
  },
  {
    name: 'availability',
    required: true,
    label: 'AVAILABILITY',
    align: 'left',
    field: 'availability',
    sortable: true,
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
    label: 'UPDATED AT',
    align: 'left',
    field: 'updatedAt',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'ACTIONS',
    align: 'left',
    field: 'actions',
    sortable: false,
  },
];
</script>
