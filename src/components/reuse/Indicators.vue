<template>
    <div class="bg-white shadow rounded-lg p-6 mx-auto text-center">
      <h2 class="text-2xl font-bold text-gray-900">{{ title }}</h2>
      <div class="mt-4 text-5xl font-bold text-indigo-600">{{ value }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    }
  }
  </script>