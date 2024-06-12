// stores/todos.js
import { defineStore } from 'pinia';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    daftarKegiatan: [
      { nama: 'Belajar Vue.js', selesai: false },
      { nama: 'Menulis laporan proyek', selesai: true },
      { nama: 'Bersih-bersih rumah', selesai: false },
    ],
  }),
  actions: {
    updateDaftarKegiatan(newDaftarKegiatan) {
      this.daftarKegiatan = newDaftarKegiatan;
    },
  },
});
