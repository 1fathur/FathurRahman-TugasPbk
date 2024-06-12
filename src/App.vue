<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn-toggle v-model="activeTab" exclusive :options="tabOptions">
          <q-btn label="Todos" @click="navigateToTab('todos')" />
          <q-btn label="Post" @click="navigateToTab('post')" />
          <q-btn label="Album" @click="navigateToTab('album')" />
        </q-btn-toggle>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCommentsStore } from './stores/comments';

const activeTab = ref('todos');
const router = useRouter();
const commentsStore = useCommentsStore();

const navigateToTab = (tab) => {
  router.push(`/${tab}`);
};

const tabOptions = [
  { label: '', value: 'todos' },
  { label: '', value: 'post' },
  { label: '', value: 'album' }
];

// Fetch comments when the app starts
onMounted(() => {
  commentsStore.fetchComments();
});
</script>

<style scoped>
/* Custom styles if needed */
</style>
