<template>
  <div>
    <h1>Résultat de l'évaluation:</h1>
    <p>{{ evaluationResult }}</p>
  </div>
</template>

<script>
export default {
  name: 'Eval',
  data() {
    return {
      evaluationResult: null,
    }
  },
  mounted() {
    this.evaluationResult = this.$route.query.response
  }
}
</script>