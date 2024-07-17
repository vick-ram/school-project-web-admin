<template>
  <q-drawer
    :width="220"
    :persistent="true"
    :breakpoint="768"
    show-if-above
    bordered
    class="text-white no-scroll"
    v-model="store.drawerOpen"
    style="background-color: #008080"
  >
    <div
      style="
        padding-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <q-img
        src="/src//assets/titossy_img.png"
        style="width: 60px; height: 60px; cursor: pointer"
        @click="$router.push('/')"
      />
    </div>

    <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: String(0) }">
      <q-list padding>
        <div
          class="flex"
          style="
            flex-direction: column;
            width: 100%;
            height: 100%;
            justify-content: space-between;
          "
        >
          <div>
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
          </div>
          <q-separator spaced class="custom-separator" />
          <div>
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
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore1 } from 'src/stores/store1';
import { useRoute } from 'vue-router';

const store = useStore1();
const route = useRoute();

const isActiveRoute = (path: string) => {
  return route.path === path;
};

const drawerList = [
  {
    icon: 'img:/src/assets/customer-icon.png',
    label: 'Customers',
    path: '/',
  },
  {
    icon: 'img:/src/assets/delivery.png',
    label: 'Suppliers',
    path: '/supplier',
  },
  {
    icon: 'img:/src/assets/team.png',
    label: 'Employees',
    path: '/employee',
  },
  {
    icon: 'img:/src/assets/calendar.png',
    label: 'Bookings',
    path: '/booking',
  },
  {
    icon: 'img:/src/assets/cleaning.png',
    label: 'Services',
    path: '/service',
  },
  {
    icon: 'img:/src/assets/inventory.png',
    label: 'Inventory',
    path: '/inventory',
  },
  {
    icon: 'img:/src/assets/increase.png',
    label: 'Revenue',
    path: '/revenue',
  },
];

const mainDrawerList = computed(() => drawerList.slice(0, 7));
const bottomDrawerList = computed(() => drawerList.slice(7));
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  padding-top: 15px;
}

.avatar-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.custom-item {
  transition: background-color 0.3s;
  margin: 10px 10px;
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

.q-separator.custom-separator {
  border-color: #ecf0f1;
  margin: 15px 0;
}
</style>
