<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="verifyCode" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="verificationCode">
              Code de vérification
            </label>
            <input v-model="code"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="verificationCode" type="text" placeholder="Code de vérification">
          </div>
          <div v-if="verified" class="bg-green-400 rounded-md shadow px-4 py-2 mb-4">
            Votre code a été vérifié. Veuillez attendre la validation de nos équipes.
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Vérifier
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { Auth } from 'aws-amplify';

export default {
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const code = ref('');
    const verified = ref(false);

    async function verifyCode() {
      try {
        await Auth.confirmSignUp(props.email, code.value);
        verified.value = true;
      } catch (error) {
        console.error('error confirming sign up', error);
      }
    }

    return {
      code,
      verifyCode,
      verified,
    }
  },
}
</script>

  