<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.prevent="changeTempPassword" class="bg-white shadow-lg border border-indigo-50 rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="tempPassword">
                            Temporary Password
                        </label>
                        <input v-model="tempPassword"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="tempPassword" type="password" placeholder="Temporary Password">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="newPassword">
                            New Password
                        </label>
                        <input v-model="newPassword"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="newPassword" type="password" placeholder="New Password">
                    </div>
                    <div class="flex items-center justify-between">
                        <button
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Change Password
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"
                            @click.prevent="goToLogin">
                            Back to Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { Auth } from 'aws-amplify';

export default {
  props: {
    email: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempPassword: '',
      newPassword: ''
    }
  },
  methods: {
    async changeTempPassword() {
      try {
        const user = await Auth.signIn(this.email, this.tempPassword);
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          await Auth.completeNewPassword(user, this.newPassword);
          console.log('Password changed');
          this.$emit('nextStep', 'Login');
        }
      } catch (error) {
        console.error(error);
      }
    },
    goToLogin() {
      this.$emit('nextStep', 'Login');
    }
  }
}
</script>
  