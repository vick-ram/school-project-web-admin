import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import formatTimestamp from 'src/composables/dateFormatter';
import formatString from 'src/composables/wordShorten';

export const useEmployeeStrore = defineStore('employee', {
  state: () => ({
    employees: null as Employee[] | null,
  }),
  actions: {
    async fetchEmployees() {
      try {
        const response = await api.get<{
          status: string;
          error: string;
          data: Employee[];
        }>('/employee');
        if (response.data.status === 'success') {
          this.employees = response.data.data.map((empl) => ({
            ...empl,
            createdAt: formatTimestamp(empl.createdAt),
            updatedAt: formatTimestamp(empl.updatedAt),
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
