<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      :rows="employees"
      :columns="columns"
      :loading="loading"
      row-key="name"
      title="Employees"
      :filter="search"
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
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          label="create"
          flat
          dense
          color="secondary"
          @click="useStore.openDialog"
        />
      </template>
    </q-table>
    <q-dialog v-model="useStore.dialogOpen">
      <AddNewEmployee />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useEmployeeStrore } from 'src/stores/employeeStore';
import { QTableColumn } from 'quasar';
import { useStore1 } from 'src/stores/store1';
import AddNewEmployee from 'src/components/AddNewEmployee.vue';

const store = useEmployeeStrore();
const employees = ref<Employee[]>([]);
const loading = ref(true);
const search = ref('');
const useStore = useStore1();

onMounted(async () => {
  await store.fetchEmployees();
  const storeEmployees = store.employees;
  if (storeEmployees) {
    employees.value = storeEmployees;
  }
  loading.value = false;
});

const columns: QTableColumn<Employee>[] = [
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
    name: 'gender',
    required: true,
    label: 'Gender',
    align: 'left',
    field: 'gender',
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
    name: 'phone',
    label: 'Phone',
    align: 'left',
    field: 'phone',
    sortable: true,
  },
  {
    name: 'role',
    label: 'Role',
    align: 'left',
    field: 'role',
    sortable: true,
  },
  {
    name: 'availability',
    label: 'Availability',
    align: 'left',
    field: 'availability',
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
