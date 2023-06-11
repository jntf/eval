<template>
  <div class="">
    <div class="bg-red-900 text-white py-4">
      <Header />
    </div>
    <div class="fixed inset-0 flex items-center justify-center z-50 pt-36">
      <div class="w-full max-w-xl px-4">
        <div class="grid grid-cols-2">
          <div class="w-full bg-blue-400 text-center text-white hover:bg-blue-800 py-3" @click="currentStep = 'Login'">
            Connexion</div>
          <div class="w-full bg-blue-400 text-center text-white hover:bg-blue-800 py-3" @click="currentStep = 'SignUp'">
            Demande d'inscription</div>
        </div>
        <component :is="currentStep" :email="email" @nextStep="nextStep" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Header from '../../components/home/Header.vue';
import Footer from '../../components/home/Footer.vue';
import Login from '../../components/auth/Login.vue';
import ForgotPassword from '../../components/auth/ForgotPassword.vue';
import VerifyCode from '../../components/auth/VerifyCode.vue';
import ChangeTempPassword from '../../components/auth/ChangeTempPassword.vue';
import SignUp from '../../components/auth/SignUp.vue';
import SignUpVerification from '../../components/auth/SignUpVerification.vue';

export default {
  components: {
    Header,
    Footer,
    Login,
    ForgotPassword,
    VerifyCode,
    ChangeTempPassword,
    SignUp,
    SignUpVerification
  },
  setup() {
    const currentStep = ref('Login');
    const email = ref('');

    function nextStep(step, emailValue) {
      if (step === 'SignUp') {
        currentStep.value = 'SignUpVerification';
      } else {
        currentStep.value = step;
      }
      email.value = emailValue;
    }

    return {
      currentStep,
      email,
      nextStep
    }
  },
}

</script>

  