<template>
    <div class="album-detail-container" v-if="photo">
      <h1>{{ photo.title }}</h1>
      <img :src="photo.url" :alt="photo.title" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter, useRoute } from 'vue-router';
  
  const photo = ref(null);
  const router = useRouter();
  const route = useRoute();
  
  onMounted(async () => {
    try {
      const photoId = Number(route.params.id);
      const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
      photo.value = response.data;
    } catch (error) {
      console.error(error);
    }
  });
  </script>
  
  <style scoped>
  .album-detail-container {
    padding: 20px;
    text-align: center;
  }
  
  .album-detail-container img {
    max-width: 100%;
    height: auto;
  }
  </style>
  