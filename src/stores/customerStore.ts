import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import formatTimestamp from 'src/composables/dateFormatter';
import { useStore1 } from './store1';

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    customers: null as Customer[] | null,
    customer: {
      username: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
    },
  }),
  actions: {
    resetCustomer() {
      this.customer = {
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
      };
    },
    createCustomer() {
      const $q = useStore1();
      api
        .post('/customer/auth/sign_up', this.customer)
        .then((response) => {
          if (response.data.status === 'success') {
            Notify.create({
              message: response.data.message,
              color: 'green',
            });
            this.resetCustomer();
            $q.dialogOpen = false;
          } else if (response.data.status === 'error') {
            throw new Error(response.data.error);
          }
        })
        .catch((e) => {
          Notify.create({
            message: String(e),
            color: 'red',
          });
        });
    },

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
