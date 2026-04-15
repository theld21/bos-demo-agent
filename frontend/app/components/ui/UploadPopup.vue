<template>
  <div>
    <slot name="trigger" :open="open">
      <button @click="open" class="flex items-center justify-center gap-2 bg-surface-container-high text-on-surface px-4 py-2.5 rounded-md hover:bg-surface-dim transition-all text-sm font-medium">
        <span class="material-symbols-outlined text-[1.125rem]">file_upload</span> Import
      </button>
    </slot>

    <div v-if="modelValue" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl border border-outline-variant/20 overflow-hidden flex flex-col">
        <div class="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-on-surface">{{ title }}</h3>
          <button @click="close" class="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-md hover:bg-surface-container-high">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div class="p-8 flex flex-col items-center justify-center gap-4 text-center">
          <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
            <span class="material-symbols-outlined text-3xl">upload_file</span>
          </div>
          <div>
            <p class="font-medium text-on-surface text-base">Click to upload or drag and drop</p>
            <p class="text-sm text-on-surface-variant mt-1">Excel, CSV, or JSON (max 10MB)</p>
          </div>
          <button class="mt-4 bg-primary text-on-primary px-6 py-2.5 rounded-lg font-medium hover:bg-primary-container transition-all hover:shadow-md">
            Select File
          </button>
        </div>
        
        <div class="p-4 bg-surface-container-low border-t border-outline-variant/10 flex justify-end gap-3">
          <button @click="close" class="px-5 py-2 rounded-lg font-medium text-on-surface bg-surface-container-high hover:bg-surface-dim transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: 'Upload File'
  }
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}

const open = () => {
  emit('update:modelValue', true)
}
</script>
