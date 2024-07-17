<template>
  <div class="q-pa-md">
    <q-table
      class="table-header"
      flat
      :bordered="true"
      :columns="columns"
      :rows="customerPayments"
      row-key="name"
      :filter="filter"
      title="Revenue"
      :loading="loading"
      hide-bottom
      :rows-per-page-options="[-1]"
    >
      <template #top-right>
        <q-input
          flat
          dense
          :borderless="true"
          v-model="filter"
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
          <q-td key="paymentId" :props="props">
            {{ props.row.paymentId }}
          </q-td>
          <q-td key="bookingId" :props="props">
            {{ props.row.bookingId }}
          </q-td>
          <q-td key="amount" :props="props">
            {{ props.row.amount }}
          </q-td>
          <q-td key="paymentMethod" :props="props">
            {{ props.row.paymentMethod }}
          </q-td>
          <q-td key="phone" :props="props">
            {{ props.row.phoneNumber }}
          </q-td>
          <q-td key="code" :props="props">
            {{ props.row.transactionCode }}
          </q-td>
          <q-td key="status" :props="props">
            <span :class="statusColors(props.row.paymentStatus)">
              {{ props.row.paymentStatus }}
            </span>
          </q-td>
          <q-td key="createdAt" :props="props">
            {{ props.row.createdAt }}
          </q-td>
          <q-td key="updatedAt" :props="props">
            {{ props.row.updatedAt }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn flat round dense icon="more_vert">
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
                    @click="update(props.row)"
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
    <div class="q-mt-xl">
      <q-table
        class="table-header"
        :rows="supplierPayments"
        :columns="supplierColumns"
        :loading="loading"
        title="Expenditure"
        bordered
        row-key="name"
        flat
        :filter="search"
        hide-bottom
        :rows-per-page-options="[-1]"
      >
        <template #top-right>
          <q-input v-model="search" flat dense placeholder="Search" borderless>
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template #body-cell-status="props">
          <q-td :props="props">
            <span :class="statusColors(props.row.status)">
              {{ props.row.status }}
            </span>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { QTableColumn, useQuasar } from 'quasar';
import { useRevenueStore } from 'src/stores/revenueStore';
import { api } from 'src/boot/axios';

const revenueStore = useRevenueStore();
const filter = ref('');
const search = ref('');
const loading = ref(false);
const $q = useQuasar();

const customerPayments = ref<CustomerPayment[]>([]);
const supplierPayments = ref<SupplierPayment[]>([]);

onMounted(async () => {
  loading.value = true;
  await revenueStore.fetchCustomerPayments();
  const storePayments = revenueStore.customerPayments;
  if (storePayments) {
    customerPayments.value = storePayments;
  }
  loading.value = false;
});

onMounted(async () => {
  loading.value = true;
  await revenueStore.fetchSupplierPayments();
  const storePayments = revenueStore.supplierPayments;
  if (storePayments) {
    supplierPayments.value = storePayments;
  }
  loading.value = false;
});

const update = (payment: CustomerPayment) => {
  console.log('');
};

const deleteRow = (payment: CustomerPayment) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Coonfirm you want to delete payment',
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
        `/payment/customer/${payment.paymentId}`
      );
      if (response.data.status === 'success') {
        customerPayments.value = customerPayments.value.filter(
          (paym) => payment.paymentId !== paym.paymentId
        );
        await revenueStore.fetchCustomerPayments();
        $q.notify({
          message: response.data.message,
          color: 'green',
        });
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

const statusColors = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'status-pending';
    case 'CONFIRMED':
      return 'status-confirmed';
    case 'REFUNDED':
      return 'status-refunded';
    case 'CANCELLED':
      return 'status-cancelled';
    default:
      return '';
  }
};

const columns: QTableColumn<CustomerPayment>[] | any = [
  {
    name: 'paymentId',
    label: 'PAYMENT ID',
    align: 'left',
    field: 'paymentId',
    sortable: true,
  },
  {
    name: 'bookingId',
    label: 'BOOKING ID',
    align: 'left',
    field: 'bookingId',
    sortable: true,
  },
  {
    name: 'amount',
    label: 'AMOUNT',
    align: 'left',
    field: 'amount',
    sortable: true,
  },
  {
    name: 'paymentMethod',
    label: 'METHOD',
    align: 'left',
    field: 'paymentMethod',
    sortable: true,
  },
  {
    name: 'phone',
    label: 'PHONE',
    align: 'left',
    field: 'phoneNumber',
    sortable: true,
  },
  {
    name: 'code',
    label: 'TRANSACTION CODE',
    align: 'left',
    field: 'transactionCode',
    sortable: false,
  },
  {
    name: 'status',
    label: 'PAYMENT STATUS',
    align: 'left',
    field: 'paymentStatus',
    sortable: true,
  },
  {
    name: 'createdAt',
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

const supplierColumns: QTableColumn<SupplierPayment>[] | any = [
  {
    name: 'paymentId',
    label: 'PAYMENT ID',
    align: 'left',
    field: 'paymentId',
    sortable: true,
  },
  {
    name: 'employee',
    label: 'Processed By',
    align: 'left',
    field: 'employee',
    sortable: true,
  },
  {
    name: 'orderId',
    label: 'ORDER ID',
    align: 'left',
    field: 'orderId',
    sortable: true,
  },
  {
    name: 'supplier',
    label: 'Supplier',
    align: 'left',
    field: 'supplier',
    sortable: true,
  },
  {
    name: 'date',
    label: 'Processd On',
    align: 'left',
    field: 'paymentDate',
    sortable: true,
  },
  {
    name: 'amount',
    label: 'Amount',
    align: 'left',
    field: 'amount',
    sortable: true,
  },
  {
    name: 'method',
    label: 'METHOD',
    align: 'left',
    field: 'method',
    sortable: true,
  },
  {
    name: 'reference',
    label: 'REFERENCE NO.',
    align: 'left',
    field: 'paymentReference',
    sortable: false,
  },
  {
    name: 'status',
    label: 'PAYMENT STATUS',
    align: 'left',
    field: 'status',
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

<style scoped>
.status-pending {
  color: orange;
}
.status-confirmed {
  color: green;
}
.status-refunded {
  color: blue;
}
.status-cancelled {
  color: red;
}
</style>
