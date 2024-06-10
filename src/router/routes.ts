import { RouteRecordRaw } from 'vue-router';

import DashboardPage from 'pages/DashboardPage.vue';
import BookingsPage from 'pages/BookingsPage.vue';
import CustomersPage from 'pages/CustomersPage.vue';
import SupplierPage from 'pages/SuppliersPage.vue';
import EmployeesPage from 'pages/EmployeesPage.vue';
import RevenuePage from 'pages/RevenuePage.vue';
import MainLayout from 'src/layouts/MainLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'customer',
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
