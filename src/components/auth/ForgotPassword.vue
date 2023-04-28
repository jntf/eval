<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="forgotPassword" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email">
            </div>
            <div class="flex items-center justify-between">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Reset Password
              </button>
              <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" @click.prevent="goToLogin">
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
    data() {
      return {
        email: ''
      }
    },
    methods: {
      async forgotPassword() {
        try {
          await Auth.forgotPassword(this.email)
          console.log('Password reset code sent')
          this.$emit('nextStep', 'VerifyCode', this.email)
        } catch (error) {
          console.error(error)
        }
      },
      goToLogin() {
        this.$emit('nextStep', 'Login')
      }
    }
  }
  </script>