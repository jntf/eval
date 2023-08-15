<template>
  <div class="kpi-container py-5 px-6 shadow-lg text-white" :class="color">
    <p class="text-lg font-bold mb-2">{{ title }}</p>
    <div class="grid grid-cols-6 gap-2 items-center">
      <div class="col-span-5 flex justify-center">
        <p class="text-5xl font-bold mb-2">{{ value }}</p>
      </div>
      <div class="col-span-1 flex justify-end">
        <i class="text-7xl opacity-25 text-right" :class="icon"></i>
      </div>
    </div>
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
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
    },
};
</script>
  
<style scoped>
.kpi-container {
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
}
</style>