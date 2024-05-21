<template>
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
        <select v-model="selectedUsername" @change="selectUsername(selectedUsername)" class="btn btn-secondary" style="background-color: green;">
          <option value="" selected>Pilih Pengguna</option>
          <option v-for="username in usernames" :key="username">{{ username }}</option>
        </select>
      </div>
      
      <div v-if="selectedUser" class="mt-3">
        <h3 class="text-center">Data yang Dipilih:</h3>
        <p class="text-center">Username: <strong>{{ selectedUsername }}</strong></p>
        <p class="text-center">Email: <strong>{{ selectedEmail }}</strong></p>
        <p class="text-center">Komentar: <strong>{{ selectedComments }}</strong></p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  const props = defineProps({
    selectedComments: Array
  });
  const emit = defineEmits(['updateComments']);
  
  const newUsername = ref('');
  const newEmail = ref('');
  const newComment = ref('');
  const selectedUsername = ref('');
  const selectedUser = ref(null);
  
  const usernames = computed(() => props.selectedComments.map(comment => comment.username));
  
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
      emit('updateComments', [...props.selectedComments, response.data]);
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
      const selectedUserComment = props.selectedComments.find(comment => comment.username === username); 
      if (selectedUserComment) {
        const alertMessage = `Username: ${selectedUserComment.username}`;
        const alertMessage2 = `Email: ${selectedUserComment.email}`;
        const alertMessage3 = `Komentar: ${selectedUserComment.comment}`;
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
  .container, .mt-5 {
    position: fixed;
    left: 44%;
    top: 25%;
    width: 15%;
    backdrop-filter: blur(10px);
  }
  
  .container label {
    color: white;
  }
  
  .centered-text {
    text-align: center;
  }
  </style>
  