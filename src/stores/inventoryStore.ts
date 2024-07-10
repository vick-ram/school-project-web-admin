import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import formatTimestamp from 'src/composables/dateFormatter';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    products: null as Inventory[] | null,
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await api.get<{
          status: string;
          error: string;
          data: Inventory[];
        }>('/product');
        if (response.data.status === 'success') {
          this.products = response.data.data.map((product) => ({
            ...product,
            createdAt: formatTimestamp(product.createdAt),
            updatedAt: formatTimestamp(product.updatedAt),
          }));
        } else if (response.data.status === 'error') {
          throw new Error(response.data.error);
        }
      } catch (errors) {
        Notify.create({
          message: String(errors),
          color: 'red',
        });
      }
    },
  },
});
