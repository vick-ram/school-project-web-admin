<template>
  <q-drawer
    :width="250"
    :persistent="true"
    :breakpoint="768"
    show-if-above
    bordered
    class="text-white"
    v-model="store.drawerOpen"
    style="background-color: #34495e"
  >
    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: String(0) }">
      <q-list padding>
        <q-item
          v-for="(item, index) in mainDrawerList"
          :key="index"
          :to="item.path"
          clickable
          v-ripple
          class="custom-item"
          :active="isActiveRoute(item.path)"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            {{ item.label }}
          </q-item-section>
        </q-item>
        <q-separator spaced class="custom-separator" />
        <div class="bottom-items">
          <q-item
            v-for="(item, index) in bottomDrawerList"
            :key="index"
            :to="item.path"
            clickable
            v-ripple
            class="custom-item"
            :active="isActiveRoute(item.path)"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore1 } from 'src/stores/store1';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

const store = useStore1();
const $q = useQuasar();
const route = useRoute();

const isActiveRoute = (path: string) => {
  return route.path === path;
};

const drawerList = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    path: '/',
  },
  {
    icon: 'people',
    label: 'Customers',
    path: '/customer',
  },
  {
    icon: 'local_shipping',
    label: 'Suppliers',
    path: '/supplier',
  },
  {
    icon: 'badge',
    label: 'Employees',
    path: '/employee',
  },
  {
    icon: 'book_online',
    label: 'Bookings',
    path: '/booking',
  },
  {
    icon: 'paid',
    label: 'Revenue',
    path: '/revenue',
  },
  {
    icon: 'help',
    label: 'Help',
    path: '/help',
  },
  {
    icon: 'settings',
    label: 'Settings',
    path: '/settings',
  },
];

const mainDrawerList = computed(() => drawerList.slice(0, 6));
const bottomDrawerList = computed(() => drawerList.slice(6));
</script>

<style scoped>
.custom-item {
  transition: background-color 0.3s;
  margin: 15px 10px;
  padding: 10px 15px;
  border-radius: 8px;
}

.custom-item:hover {
  background-color: #1abc9c;
}

.q-item .q-item__section--main {
  font-weight: bold;
}

.q-item .q-icon {
  color: #ecf0f1;
}

.q-item-section.text-center {
  display: flex;
  justify-content: center;
}

.bottom-items {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.q-separator.custom-separator {
  border-color: #ecf0f1;
  margin: 15px 0;
}
</style>
