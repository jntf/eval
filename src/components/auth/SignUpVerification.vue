<template>
  <div>
    <h1>Verification</h1>
    <form @submit.prevent="verifyCode">
      <input type="text">
      <input v-model="code" type="text" placeholder="Verification code">
      <button type="submit">Verify</button>
    </form>
    <p v-if="verified" class="bg-green-400 rounded-md shadow">Votre code a été vérifié. Veuillez attendre la validation de nos équipes.</p>
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
        // Navigate to login or another page here
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

  