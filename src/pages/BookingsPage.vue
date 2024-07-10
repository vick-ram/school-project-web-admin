<template>
  <div class="q-pa-md">
    <q-table
      class="table-header"
      flat
      bordered
      :rows="bookings"
      :columns="columns"
      row-key="name"
      title="Bookings"
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
          color="white"
          class="custom-input"
        >
          <template v-slot:append>
            <q-icon name="search" color="white" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <span
            :class="{
              'text-green': props.row.bookingStatus === 'COMPLETED',
              'text-orange': props.row.bookingStatus === 'IN_PROGRESS',
              'text-blue': props.row.bookingStatus === 'PENDING',
              'text-red': props.row.bookingStatus === 'CANCELLED',
              'text-gray': props.row.bookingStatus === 'APPROVED',
            }"
          >
            {{ props.row.bookingStatus }}
          </span>
        </q-td>
      </template>
      <template v-slot:body-cell-paid="props">
        <q-td :props="props">
          <span :class="{ 'text-green': props.row.paid }">
            {{ props.row.paid ? 'Paid' : 'Not Paid' }}
          </span>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { usebookingStore } from 'src/stores/bookingStore';
import { onMounted, ref } from 'vue';

const bookingStore = usebookingStore();
const bookings = ref<Booking[]>([]);
const loading = ref(true);
const search = ref('');

onMounted(async () => {
  await bookingStore.fetchBookings();
  const storeBookings = bookingStore.bookings;
  if (storeBookings) {
    bookings.value = storeBookings;
  }
  loading.value = false;
});

const columns: QTableColumn<Booking | any>[] = [
  {
    name: 'bookingId',
    required: true,
    label: 'BookingID',
    align: 'left',
    field: 'bookingId',
    sortable: true,
  },
  {
    name: 'customer',
    required: true,
    label: 'Customer',
    align: 'left',
    field: 'customer',
    sortable: true,
  },
  {
    name: 'date',
    required: true,
    label: 'BookingDate',
    align: 'left',
    field: 'bookingDateTime',
    sortable: true,
  },
  {
    name: 'frequency',
    required: true,
    label: 'frequency',
    align: 'left',
    field: 'frequency',
    sortable: true,
  },
  {
    name: 'instructions',
    required: true,
    label: 'Instructions',
    align: 'left',
    field: 'additionalInstructions',
    sortable: true,
  },
  {
    name: 'service',
    required: false,
    label: 'Service',
    align: 'left',
    field: (row: Booking) => {
      return row.bookingServiceAddOns
        .map((addon) => `${addon.service} (${addon.quantity})`)
        .join(', ');
    },
    sortable: true,
  },
  {
    name: 'address',
    required: true,
    label: 'Address',
    align: 'left',
    field: 'address',
    sortable: true,
  },
  {
    name: 'amount',
    required: true,
    label: 'Amount',
    align: 'left',
    field: 'totalAmount',
    sortable: true,
  },
  {
    name: 'paid',
    required: true,
    label: 'Paid',
    align: 'left',
    field: 'paid',
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: 'bookingStatus',
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
];
</script>

<style lang="sass">
.table-header
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #008080
    color: #ffffff
  thead tr:last-child th
    top: 48px
q-input
  .custom-input
    color: #ffffff
</style>
