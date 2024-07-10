import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import formatTimestamp from 'src/composables/dateFormatter';
import { useStore1 } from './store1';

export const useSupplierStore = defineStore('supplier', {
  state: () => ({
    suppliers: null as Supplier[] | null,
    supplier: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      email: '',
      password: '',
    },
  }),
  actions: {
    resetSupplier() {
      this.supplier = {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        email: '',
        password: '',
      };
    },

    createSupplier() {
      const store = useStore1();
      api
        .post('/supplier/auth/sign_up', this.supplier)
        .then((response) => {
          if (response.data.status === 'success') {
            Notify.create({
              message: response.data.message,
              color: 'green',
            });
            store.dialogOpen = false;
            this.resetSupplier();
          } else if (response.data.status === 'error') {
            throw new Error(response.data.error);
          }
        })
        .catch((e) => {
          Notify.create({
            message: String(e.message),
            color: 'red',
          });
        });
    },

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
