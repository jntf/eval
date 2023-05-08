<template>
    <span @click="$emit('toggle', option)" class="text-sm sm:text-base">
        {{ option.label.toUpperCase() }}
        <span v-if="option.selected" class="text-green-500">✓</span>
    </span>
</template>
  
<script>
export default {
    props: {
        option: Object,
    },
};
</script>