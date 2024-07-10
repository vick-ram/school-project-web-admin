<template>
  <div class="q-pa-md">
    <q-table
      class="table-header"
      flat
      bordered
      :columns="columns"
      :rows="products"
      row-key="name"
      title="Inventory"
      :filter="filter"
      :loading="loading"
      hide-bottom
      hide-pagination
      :rows-per-page-options="[-1]"
    >
      <template #top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          class="q-mr-md"
          color="white"
        >
          <template #append>
            <q-icon name="search" color="white" />
          </template>
        </q-input>
      </template>
      <template #body-cell-image="props">
        <q-img :src="props.row.image" width="100" height="50" />
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { useInventoryStore } from 'src/stores/inventoryStore';
import { ref, onMounted } from 'vue';

const productStore = useInventoryStore();
const products = ref<Inventory[]>([]);
const filter = ref('');
const loading = ref(true);
const columns: QTableColumn<Inventory>[] = [
  {
    name: 'productId',
    required: true,
    label: 'ProductID',
    align: 'left',
    field: 'productId',
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
    field: 'unitPrice',
    sortable: true,
  },
  {
    name: 'image',
    required: true,
    label: 'Image',
    align: 'left',
    field: 'image',
    sortable: true,
  },
  {
    name: 'stock',
    required: true,
    label: 'Stock',
    align: 'left',
    field: 'stock',
    sortable: true,
  },
  {
    name: 'reorderLevel',
    required: true,
    label: 'ReorderLevel',
    align: 'left',
    field: 'reorderLevel',
    sortable: true,
  },
  {
    name: 'sku',
    required: true,
    label: 'SKU',
    align: 'left',
    field: 'sku',
    sortable: true,
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
];

onMounted(async () => {
  await productStore.fetchProducts();
  const storeProducts = productStore.products;
  if (storeProducts) {
    products.value = storeProducts;
  }
  loading.value = false;
});
</script>
