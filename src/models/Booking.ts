interface Booking {
  bookingId: string;
  customer: string;
  bookingDateTime: string;
  frequency: string;
  additionalInstructions: string;
  bookingServiceAddOns: BookingService[];
  address: string;
  totalAmount: string;
  paid: boolean;
  bookingStatus: string;
  createdAt: string;
  updatedAt: string;
}

type BookingService = {
  service: string;
  serviceAddOn: string | null;
  quantity: number;
  subtotal: number;
};
