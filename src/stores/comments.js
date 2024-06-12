import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommentsStore = defineStore({
  id: 'comments',
  state: () => ({
    comments: []
  }),
  actions: {
    async fetchComments() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=5');
        this.comments = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addComment(comment) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/comments', comment);
        this.comments.push(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
});
