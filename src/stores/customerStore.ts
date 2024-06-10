import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import formatString from 'src/composables/wordShorten';
import formatTimestamp from 'src/composables/dateFormatter';

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: null as Customer[] | null,
  }),
  actions: {
    async fetchCustomers() {
      try {
        const response = await api.get<{
          status: string;
          error: string;
          data: Customer[];
        }>('/customer');
        if (response.data.status === 'success') {
          this.customers = response.data.data.map((customer) => ({
            ...customer,
            createdAt: formatTimestamp(customer.createdAt),
            updatedAt: formatTimestamp(customer.updatedAt),
          }));
          console.log(response.data.data);
        } else if (response.data.status === 'error') {
          Notify.create({
            message: response.data.error,
            color: 'red',
          });
        }
      } catch (error) {
        Notify.create({
          message: 'Failed to fetch customers: ' + String(error),
          color: 'red',
        });
      }
    },
  },
});
