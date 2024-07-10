import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import formatTimestamp from 'src/composables/dateFormatter';

export const useRevenueStore = defineStore('revenue', {
  state: () => ({
    customerPayments: null as CustomerPayment[] | null,
  }),
  actions: {
    async fetchCustomerPayments() {
      try {
        const response = await api.get<{
          status: string;
          data: CustomerPayment[];
          error: string;
        }>('/payment/customer');
        if (response.data.status === 'success') {
          this.customerPayments = response.data.data.map((paym) => ({
            ...paym,
            createdAt: formatTimestamp(paym.createdAt),
            updatedAt: formatTimestamp(paym.updatedAt),
          }));
          console.log(this.customerPayments);
        } else if (response.data.status === 'error') {
          throw new Error(response.data.error);
        }
        console.log(response.data.data);
      } catch (error) {
        Notify.create({
          message: String(error),
          color: 'red',
        });
        console.log(error);
      }
    },
  },
});
