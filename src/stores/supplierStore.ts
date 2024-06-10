import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import formatTimestamp from 'src/composables/dateFormatter';
import formatString from 'src/composables/wordShorten';

export const useSupplierStore = defineStore('supplier', {
  state: () => ({
    suppliers: null as Supplier[] | null,
  }),
  actions: {
    async fetchSuppliers() {
      try {
        const response = await api.get<{
          status: string;
          error: string;
          data: Supplier[];
        }>('/supplier');
        if (response.data.status === 'success') {
          this.suppliers = response.data.data.map((supplier) => ({
            ...supplier,
            createdAt: formatTimestamp(supplier.createdAt),
            updatedAt: formatTimestamp(supplier.updatedAt),
          }));
        } else if (response.data.status === 'error') {
          Notify.create({
            message: response.data.error,
            color: 'red',
          });
          console.log(response.data.error);
        }
      } catch (error) {
        Notify.create({
          message: `Failed to fetch employees: ${String(error)}`,
          color: 'red',
        });
        console.log(error);
      }
    },
  },
});
