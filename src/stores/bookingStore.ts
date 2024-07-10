import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import formatTimestamp from 'src/composables/dateFormatter';

export const usebookingStore = defineStore('booking', {
  state: () => ({
    bookings: null as Booking[] | null,
  }),
  actions: {
    async fetchBookings() {
      try {
        const response = await api.get<{
          status: string;
          error: string;
          data: Booking[];
        }>('/booking');
        if (response.data.status === 'success') {
          this.bookings = response.data.data.map((booking) => ({
            ...booking,
            bookingServiceAddOns: booking.bookingServiceAddOns.map((addon) => ({
              service: addon.service,
              serviceAddOn: addon.serviceAddOn,
              quantity: addon.quantity,
              subtotal: addon.subtotal,
            })),
            createdAt: formatTimestamp(booking.createdAt),
            updatedAt: formatTimestamp(booking.updatedAt),
          }));
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
