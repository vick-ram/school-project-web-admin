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
      <template #body="props">
        <q-tr :props="props">
          <q-td key="productId" :props="props">
            {{ props.row.productId }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.unitPrice }}
          </q-td>
          <q-td key="image" :props="props">
            <q-img :src="props.row.image" width="100" heigh="50" />
          </q-td>
          <q-td key="stock" :props="props">
            {{ props.row.stock }}
          </q-td>
          <q-td key="reorderLevel" :props="props">
            {{ props.row.reorderLevel }}
          </q-td>
          <q-td key="sku" :props="props">
            {{ props.row.sku }}
          </q-td>
          <q-td key="createdAt" :props="props">
            {{ props.row.createdAt }}
          </q-td>
          <q-td key="updatedAt" :props="props">
            {{ props.row.updatedAt }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn icon="more_vert" flat round dense />
          </q-td>
        </q-tr>
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
const columns: QTableColumn<Inventory>[] | any = [
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
  {
    name: 'actions',
    required: true,
    label: 'Actions',
    align: 'center',
    sortable: false,
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
