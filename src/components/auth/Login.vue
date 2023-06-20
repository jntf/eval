<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input v-model="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" type="text" placeholder="Email">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Mot de passe
            </label>
            <input v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" placeholder="Password">
          </div>
          <div v-if="errorMessage" class="error-message italic text-red-700 pb-3 text-sm">{{ errorMessage }}</div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Connexion
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"
              @click.prevent="forgotPassword">
              Mot de passe oublié?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import { Auth } from 'aws-amplify';
import { useRouter } from 'vue-router';

export default {
  setup(props, context) {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const errorMessage = ref(''); // New

    const login = async () => {
      try {
        const user = await Auth.signIn(email.value, password.value);
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          context.emit('nextStep', 'ChangeTempPassword', email.value);
        } else {
          console.log('Logged in');
          context.emit('login', email.value, password.value);
          router.push('/analyse');
        }
      } catch (error) {
        console.error(error);
        errorMessage.value = 'L\'identifiant ou le mot de passe sont invalide, veuillez les ressaisir svp...'; // New
      }
    };

    const forgotPassword = () => {
      context.emit('nextStep', 'ForgotPassword', email.value);
    };

    return {
      email,
      password,
      login,
      forgotPassword,
      errorMessage, // New
    };
  },
};
</script>
  
  