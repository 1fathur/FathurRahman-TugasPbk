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

    <Todos v-if="activeTab === 'todos'" :daftarKegiatan="daftarKegiatan" @updateDaftarKegiatan="updateDaftarKegiatan" />
    <Post v-if="activeTab === 'post'" :selectedComments="selectedComments" @updateComments="updateComments" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Todos from './components/Tudos.vue';
import Post from './components/Post.vue';

const daftarKegiatan = ref([
  { nama: 'Belajar Vue.js', selesai: false },
  { nama: 'Menulis laporan proyek', selesai: true },
  { nama: 'Bersih-bersih rumah', selesai: false }
]);

const selectedComments = ref([]);
const activeTab = ref('todos');

const updateDaftarKegiatan = (newDaftarKegiatan) => {
  daftarKegiatan.value = newDaftarKegiatan;
};

const updateComments = (newComments) => {
  selectedComments.value = newComments;
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

.navbar-nav a {
  border: 1px solid white;
  color: white;
  font-weight: bold;
  margin-left: 50px;
}

.navbar-nav a:hover {
  color: gray;
  background-color: black;
  cursor: pointer;
  border-color: black;
}

.background img {
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
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  filter: brightness(0.8);
}
</style>
