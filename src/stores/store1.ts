import { defineStore } from 'pinia';

export const useStore1 = defineStore('constants', {
  state: () => ({
    drawerOpen: false,
    dialogOpen: false,
  }),
  actions: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    openDialog() {
      this.dialogOpen = true;
    },
  },
});
