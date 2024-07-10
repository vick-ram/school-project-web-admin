import { RouteRecordRaw } from 'vue-router';

import BookingsPage from 'pages/BookingsPage.vue';
import CustomersPage from 'pages/CustomersPage.vue';
import SupplierPage from 'pages/SuppliersPage.vue';
import EmployeesPage from 'pages/EmployeesPage.vue';
import RevenuePage from 'pages/RevenuePage.vue';
import MainLayout from 'src/layouts/MainLayout.vue';
import ServicesPage from 'src/pages/ServicesPage.vue';
import HelpPage from 'src/pages/HelpPage.vue';
import SettingsPage from 'src/pages/SettingsPage.vue';
import InventoryPage from 'src/pages/InventoryPage.vue';
import ServiceDetails from 'src/components/ServiceDetails.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'customer',
        component: CustomersPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'supplier',
        name: 'supplier',
        component: SupplierPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'employee',
        name: 'employee',
        component: EmployeesPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'booking',
        name: 'booking',
        component: BookingsPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'revenue',
        name: 'revenue',
        component: RevenuePage,
        meta: { requiresAuth: true },
      },
      {
        path: 'service',
        name: 'service',
        component: ServicesPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'inventory',
        name: 'inventory',
        component: InventoryPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'help',
        name: 'help',
        component: HelpPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'service/:id',
        name: 'serviceDetails',
        component: ServiceDetails,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/auth/signin',
    name: 'sign_in',
    component: () => import('pages/auth/SignInPage.vue'),
  },
  {
    path: '/auth/signup',
    name: 'sign_up',
    component: () => import('pages/auth/SignUpPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
