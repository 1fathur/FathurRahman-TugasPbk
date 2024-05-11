<template>
  <div class="background">
    <img src="https://wallpaperwaifu.com/wp-content/uploads/2024/01/giant-whale-swimming-in-a-sea-of-stars-thumb.jpg" />
  </div>
  <div>
    <nav class="navbar navbar-expand-lg">
      <div class="container1">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" @click="activeTab = 'todos'">Todos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="activeTab = 'post'">Post</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div v-if="activeTab === 'todos'">
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
    </div>

<div v-if="activeTab === 'post'">
  <div class="container mt-5">
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" v-model="newUsername" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="newEmail" required>
      </div>
      <div class="form-group">
        <label for="comment">Komentar</label>
        <textarea class="form-control" id="comment" rows="3" v-model="newComment" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Kirim</button>
    </form>
    
    <div class="dropdown mt-3 text-center">
      <select v-model="selectedUsername" @change="selectUsername(selectedUsername)" class="btn btn-secondary"style="background-color: green;">
        <option value="" selected >Pilih Pengguna</option>
        <option  v-for="username in usernames" :key="username">{{ username }}</option>
      </select>
    </div>
    
    <div v-if="selectedUser" class="mt-3">
      <h3 class="text-center">Data yang Dipilih:</h3>
      <p class="text-center">Username: <strong>{{ selectedUsername }}</strong></p>
      <p class="text-center">Email: <strong>{{ selectedEmail }}</strong></p>
      <p class="text-center">Komentar: <strong>{{ selectedComments }}</strong></p>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';


const daftarKegiatan = ref([
  { nama: 'Belajar Vue.js', selesai: false },
  { nama: 'Menulis laporan proyek', selesai: true },
  { nama: 'Bersih-bersih rumah', selesai: false }
]);
const namaKegiatan = ref('');
const filterAktif = ref(false);
const activeTab = ref('todos');
const newUsername = ref('');
const newEmail = ref('');
const newComment = ref('');
const selectedUsername = ref('');
const selectedComments = ref([]);
const selectedUser = ref(null); 
const usernames = computed(() => selectedComments.value.map(comment => comment.username));

const filteredKegiatan = computed(() => {
  if (filterAktif.value) {
    return daftarKegiatan.value.filter(kegiatan => !kegiatan.selesai);
  } else {
    return daftarKegiatan.value;
  }
});

const tambahKegiatan = () => {
  if (namaKegiatan.value.trim() !== '') {
    daftarKegiatan.value.push({ nama: namaKegiatan.value, selesai: false });
    namaKegiatan.value = '';
  }
};

const tandaiSelesai = (index) => {
  daftarKegiatan.value[index].selesai = true;
};

const batalkanSelesai = (index) => {
  daftarKegiatan.value[index].selesai = false;
};

const hapusKegiatan = (index) => {
  daftarKegiatan.value.splice(index, 1);
};

const toggleFilter = () => {
  filterAktif.value = !filterAktif.value;
};


const submitPost = async () => {
  try {
    if (!newUsername.value || !newEmail.value || !newComment.value) {
      Swal.fire({
        icon: 'error',
        title: 'Data Belum Lengkap',
        text: 'Harap masukkan username, email, dan komentar.',
        confirmButtonText: 'OK'
      });
      return;
    }
    const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
      username: newUsername.value,
      email: newEmail.value,
      comment: newComment.value
    });
    selectedComments.value.push(response.data);
    Swal.fire('Berhasil!', 'Data telah berhasil diposting!', 'success');
    newUsername.value = '';
    newEmail.value = '';
    newComment.value = '';
  } catch (error) {
    console.error(error);
    Swal.fire('Error!', 'Terjadi kesalahan saat memposting data.', 'error');
  }
};

const selectUsername = (username) => {
  if (username === '') {
    Swal.fire({
      title: 'Data yang Dipilih',
      text: 'Silakan pilih pengguna terlebih dahulu.',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  } else {
    const selectedUserComment = selectedComments.value.find(comment => comment.username === username); 
    if (selectedUserComment) {
      const alertMessage = `Username:${selectedUserComment.username}`;
      const alertMessage2 =`Email: ${selectedUserComment.email}`;
      const alertMessage3 =`Komentar: ${selectedUserComment.comment}`;
      Swal.fire({
        html: `<div class="centered-text"><p><strong>${alertMessage}<br>${alertMessage2}</strong><br>${alertMessage3}</p></div>`,
        icon: 'info',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Data yang Dipilih',
        text: 'Tidak ada komentar yang terkait dengan pengguna ini.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    }
    selectedUsername.value = '';
  }
};
</script>

<style scoped>
.navbar-nav {
  display: flex;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -10%);
  z-index: 111;
}
.navbar-nav a{
  border: 1px solid white;
  color: white;
  font-weight: bold;
  margin-left: 50px;
}
.navbar-nav a:hover{
  color: gray;
  background-color: black;
  cursor: pointer;
  border-color: black;
}
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

.containe, .mt-5 {
  position: fixed;
  left: 44%;
  top: 25%;
  width: 15%;
  backdrop-filter:blur(10px);
}

.containe, .mt-5 label{
  color: white;
}
.centered-text {
    text-align: center;
  }
.background img{
  position: fixed;
  top: 0;
  left: 0;
  min-height: 90%;
  min-width: 1500px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -2;
  object-fit: cover;
  -webkit-background-size:cover; -moz-background-size:cover; -o-background-size:cover; background-size: cover;
  filter: brightness(0.8);
}
</style>
