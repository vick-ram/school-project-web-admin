import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import formatTimestamp from 'src/composables/dateFormatter';

export const useServiceStore = defineStore('service', {
  state: () => ({
    services: null as Service[] | null,
    service: null as Service | null,
    serviceAddons: null as ServiceAddon[] | null,
    serviceDialog: false,
    serviceaddonDialog: false,
  }),
  actions: {
    async fetchServices() {
      try {
        const response = await api.get<{
          status: string;
          error: string;
          data: Service[];
        }>('/service');
        if (response.data.status === 'success') {
          this.services = response.data.data.map((service) => ({
            ...service,
            createdAt: formatTimestamp(service.createdAt),
            updatedAt: formatTimestamp(service.updatedAt),
          }));
          console.log(this.services);
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
    async fetchServiceById(id: string) {
      try {
        const response = await api.get<{
          status: string;
          error: string;
          data: Service;
        }>(`/service/${id}`);
        if (response.data.status === 'success') {
          this.service = {
            ...response.data.data,
            createdAt: formatTimestamp(response.data.data.createdAt),
            updatedAt: formatTimestamp(response.data.data.updatedAt),
          };
        } else if (response.data.status === 'error') {
          throw new Error(response.data.error);
        }
      } catch (error) {
        Notify.create({
          message: String(error),
          color: 'red',
        });
      }
    },
    async fetchServiceAddons(id: string) {
      try {
        const response = await api.get<{
          status: string;
          error: string;
          data: ServiceAddon[];
        }>(`/service/${id}/addon`);
        if (response.data.status === 'success') {
          this.serviceAddons = response.data.data.map((serviceAddon) => ({
            ...serviceAddon,
            createdAt: formatTimestamp(serviceAddon.createdAt),
            updatedAt: formatTimestamp(serviceAddon.updatedAt),
          }));
          console.log(this.serviceAddons);
        } else if (response.data.status === 'error') {
          throw new Error(response.data.error);
        }
      } catch (error) {
        Notify.create({
          message: String(error),
          color: 'red',
        });
      }
    },
  },
});
