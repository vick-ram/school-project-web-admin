import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import formatTimestamp from 'src/composables/dateFormatter';
import { useStore1 } from './store1';

export const useEmployeeStrore = defineStore('employee', {
  state: () => ({
    employees: null as Employee[] | null,
    employee: {
      username: '',
      firstName: '',
      lastName: '',
      gender: '',
      email: '',
      password: '',
      phone: '',
      role: '',
      availability: null,
    },
  }),
  actions: {
    resetEmployee() {
      this.employee = {
        username: '',
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        password: '',
        phone: '',
        role: '',
        availability: null,
      };
    },

    createEmployee() {
      const useStore = useStore1();
      api
        .post('/employee/auth/sign_up', this.employee)
        .then((response) => {
          if (response.data.status === 'success') {
            Notify.create({
              message: response.data.message,
              color: 'green',
            });
            useStore.dialogOpen = false;
            this.resetEmployee();
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
