interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ServiceAddon {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
