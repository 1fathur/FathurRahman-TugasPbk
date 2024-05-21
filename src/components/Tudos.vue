<template>
    <div class="table-container">
      <div class="up">
        <h1>Daftar Kegiatan</h1>
        <div>
          <button @click="toggleFilter">{{ filterAktif ? 'Hapus Filter' : 'Filter Belum Selesai' }}</button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Nama Kegiatan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(kegiatan, index) in filteredKegiatan" :key="index">
              <td :class="{ 'selesai': kegiatan.selesai }">{{ kegiatan.nama }}</td>
              <td>{{ kegiatan.selesai ? 'Selesai' : 'Belum Selesai' }}</td>
              <td>
                <button v-if="!kegiatan.selesai" @click="tandaiSelesai(index)">Selesai</button>
                <button v-else @click="batalkanSelesai(index)">Batalkan</button>
                <button @click="hapusKegiatan(index)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div>
          <h2>Tambah Kegiatan Baru</h2>
          <input type="text" v-model="namaKegiatan" placeholder="Nama Kegiatan">
          <button @click="tambahKegiatan">Tambah</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    daftarKegiatan: Array
  });
  const emit = defineEmits(['updateDaftarKegiatan']);
  
  const namaKegiatan = ref('');
  const filterAktif = ref(false);
  
  const filteredKegiatan = computed(() => {
    if (filterAktif.value) {
      return props.daftarKegiatan.filter(kegiatan => !kegiatan.selesai);
    } else {
      return props.daftarKegiatan;
    }
  });
  
  const tambahKegiatan = () => {
    if (namaKegiatan.value.trim() !== '') {
      emit('updateDaftarKegiatan', [...props.daftarKegiatan, { nama: namaKegiatan.value, selesai: false }]);
      namaKegiatan.value = '';
    }
  };
  
  const tandaiSelesai = (index) => {
    const updatedKegiatan = [...props.daftarKegiatan];
    updatedKegiatan[index].selesai = true;
    emit('updateDaftarKegiatan', updatedKegiatan);
  };
  
  const batalkanSelesai = (index) => {
    const updatedKegiatan = [...props.daftarKegiatan];
    updatedKegiatan[index].selesai = false;
    emit('updateDaftarKegiatan', updatedKegiatan);
  };
  
  const hapusKegiatan = (index) => {
    const updatedKegiatan = props.daftarKegiatan.filter((_, i) => i !== index);
    emit('updateDaftarKegiatan', updatedKegiatan);
  };
  
  const toggleFilter = () => {
    filterAktif.value = !filterAktif.value;
  };
  </script>
  
  <style scoped>
  .table-container {
    backdrop-filter: blur(10px);
    left: 30%;
    top:20%;
    width: 50%;
    position: absolute;
    color: white;
    font-weight: bolder;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th,
  .table td {
    background-color: transparent;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .selesai {
    text-decoration: line-through;
  }
  
  button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  