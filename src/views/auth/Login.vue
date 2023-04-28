<template>
  <div>
    <div class="bg-red-900 text-white py-4">
      <Header />
    </div>
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="w-full max-w-md px-4">
        <component :is="currentStep" :email="email" @nextStep="nextStep" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/home/Header.vue';
import Login from '../../components/auth/Login.vue';
import ForgotPassword from '../../components/auth/ForgotPassword.vue';
import VerifyCode from '../../components/auth/VerifyCode.vue';

export default {
  components: {
    Header,
    Login,
    ForgotPassword,
    VerifyCode
  },
  data() {
    return {
      currentStep: 'Login',
      email: ''
    }
  },
  methods: {
    nextStep(step, email) {
      this.currentStep = step;
      this.email = email;
    }
  }
}
</script>
  