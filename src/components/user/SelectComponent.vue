<template>
    <select v-model="selectedValue" @change="$emit('change', selectedValue)" :class="[
        'w-full',
        'bg-gray-700',
        'text-white',
        'hover:bg-gray-600',
        'hover:text-red-50',
        'shadow-lg',
        'rounded-lg',
        'py-2',
        'px-1',
        'text-sm',
        'sm:text-base'
    ]" :disabled="disabled">
        <option disabled value="" class="text-white">{{ placeholder }}</option>
        <option v-for="option in options" :key="option" :value="option">{{ option.toUpperCase() }}</option>
    </select>
</template>
  
<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
    props: {
        modelValue: [String, Number, Object],
        options: Array,
        disabled: Boolean,
        placeholder: String,
    },
    setup(props, { emit }) {
        const selectedValue = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value),
        });

        return {
            selectedValue,
        };
    },
});
</script>
  