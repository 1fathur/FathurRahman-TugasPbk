// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Tudos.vue';
import Post from '../components/Post.vue';
import Album from '../components/Album.vue';
import AlbumDetail from '../components/AlbumDetail.vue';

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/post', component: Post },
  { path: '/album', component: Album },
  { path: '/album/:id', component: AlbumDetail }, // Menggunakan path /album/:id untuk detail album
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
