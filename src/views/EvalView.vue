<template>
  <div>
    <h1>Evaluation</h1>
    <p>Make: {{ formData.make }}</p>
    <p>Model: {{ formData.model }}</p>
    <p>kms: {{ formData.kms }}</p>
    <!-- Display other form fields here -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['formData'])
  }
}
</script>