<template>
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div class="relative w-full md:w-80">
      <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-outline">
        <span class="material-symbols-outlined text-[1.25rem]">search</span>
      </span>
      <input 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text" 
        :placeholder="placeholder" 
        class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-md pl-11 pr-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
      />
    </div>
    
    <div class="flex items-center gap-3 w-full md:w-auto">
      <button 
        v-if="showFilter"
        @click="$emit('filter')"
        class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-surface-container-high text-on-surface px-4 py-2.5 rounded-md hover:bg-surface-dim transition-all text-sm font-medium"
      >
        <span class="material-symbols-outlined text-[1.125rem]">filter_list</span> Filter
      </button>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Search...'
  },
  showFilter: {
    type: Boolean,
    default: true
  }
})

defineEmits(['update:modelValue', 'filter'])
</script>
