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
              Password
            </label>
            <input v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password" type="password" placeholder="Password">
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Sign In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"
              @click.prevent="forgotPassword">
              Forgot Password?
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
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const user = await Auth.signIn(this.email, this.password)
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.$emit('nextStep', 'ChangeTempPassword', this.email)
        } else {
          console.log('Logged in')
          this.$router.push('/analyse')
        }
      } catch (error) {
        console.error(error)
        alert('Invalid email or password')
      }
    },
    forgotPassword() {
      this.$emit('nextStep', 'ForgotPassword', this.email)
    }
  }
}
</script>
  
  