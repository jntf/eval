import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      formData: {},
    };
  },
  mutations: {
    updateFormData(state, payload) {
      state.formData = payload;
    },
  },
  actions: {
    submitForm({ state }) {
      // ici, vous pouvez envoyer les données de formulaire à votre backend
      console.log(state.formData);
    },
  },
});

export default store;