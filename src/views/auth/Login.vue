<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-grow flex items-center justify-center pt-36">
      <div class="w-full sm:max-w-xl">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-4 pb-5">
          <div class="w-full bg-gray-300 text-center text-white hover:bg-green-600 py-3 rounded-xl" @click="currentStep = 'Login'">
            Connexion</div>
          <div class="w-full bg-gray-300 text-center text-white hover:bg-green-600 py-3 rounded-xl" @click="currentStep = 'SignUp'">
            Demande d'inscription</div>
        </div>
        <component :is="currentStep" :email="email" @nextStep="nextStep" />
      </div>
    </div>
    <Footer />
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

  