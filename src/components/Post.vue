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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
import { useCommentsStore } from '../stores/comments';

const commentsStore = useCommentsStore();

const newUsername = ref('');
const newEmail = ref('');
const newComment = ref('');
const selectedUsername = ref('');
const selectedUser = ref(null);

const usernames = computed(() => commentsStore.comments.map(comment => comment.name));

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
    await commentsStore.addComment({
      name: newUsername.value,
      email: newEmail.value,
      comment: newComment.value
    });
    Swal.fire('Berhasil!', 'Data telah berhasil diposting!', 'success');
    newUsername.value = '';
    newEmail.value = '';
    newComment.value = '';
  } catch (error) {
    console.error(error);
    Swal.fire('Error!', 'Terjadi kesalahan saat memposting data.', 'error');
  }
};

const selectUsername = async (username) => {
  if (username === '') {
    Swal.fire({
      title: '',
      text: 'Silakan pilih pengguna terlebih dahulu.',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  } else {
    try {
      const selectedUserComment = commentsStore.comments.find(comment => comment.name === username);
      if (selectedUserComment) {
        selectedUser.value = {
          username: selectedUserComment.name,
          email: selectedUserComment.email,
          comment: selectedUserComment.comment
        };

        Swal.fire({
          title: 'Data yang Dipilih',
          html: `
            <div>
              <p>Username: <strong>${selectedUser.value.username}</strong></p>
              <p>Email: <strong>${selectedUser.value.email}</strong></p>
              <p>Komentar: <strong>${selectedUser.value.comment}</strong></p>
            </div>
          `,
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
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Terjadi kesalahan saat mengambil data komentar.', 'error');
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
  color: rgb(10, 10, 10);
}

.centered-text {
  text-align: center;
}

.dropdown select {
  width: 80%;
}
</style>
