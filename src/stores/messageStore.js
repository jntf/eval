import { defineStore } from 'pinia';

export const messageStore = defineStore({
  id: 'messageStore',
  state: () => ({
    message: null,
    messageType: null,
  }),
  actions: {
    setMessage(type, content) {
      this.messageType = type;
      this.message = content;

      setTimeout(() => {
        this.clearMessage();
      }, 2000);
    },
    clearMessage() {
      this.messageType = null;
      this.message = null;
    },
  },
});