<template>
    <div class="album-container">
      <h1>Album</h1>
      <div class="album-grid">
        <div v-for="photo in photos" :key="photo.id" class="album-item" @click="viewPhoto(photo.id)">
          <img :src="photo.thumbnailUrl" :alt="photo.title" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const photos = ref([]);
  const router = useRouter();
  
  onMounted(async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=16');
    photos.value = response.data;
  });
  
  const viewPhoto = (id) => {
    router.push(`/album/${id}`);
  };
  </script>
  
  <style scoped>
  .album-container {
    padding: 20px;
    text-align: center;
  }
  
  .album-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  
  .album-item img {
    width: 100%;
    height: auto;
    cursor: pointer;
  }
  </style>
  