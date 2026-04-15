<template>
  <div class="py-1 flex items-center justify-between text-[13px] text-slate-600 font-sans">
    <!-- Left side: Rows per page -->
    <div class="flex items-center gap-2 px-2 py-0.5 bg-[#f0f3f5] rounded text-slate-500">
      <span>{{ $t('pagination.rows_per_page') }}</span>
      <div class="relative flex items-center">
        <select 
          :value="pageSize" 
          @change="$emit('update:pageSize', Number($event.target.value))"
          class="pr-6 pl-1 py-0 bg-transparent border-none focus:ring-0 font-medium text-slate-700 cursor-pointer appearance-none text-[13px]"
        >
          <option v-for="size in [10, 20, 50, 100, 200]" :key="size" :value="size">{{ size }}</option>
        </select>
      </div>
    </div>

    <!-- Right side: Page navigation -->
    <div class="flex items-center gap-3">
      <span class="text-slate-500">
        {{ start }} - {{ end }} {{ $t('pagination.of') }} {{ total }}
      </span>
      
      <div class="flex items-center gap-1.5">
        <button 
          class="w-[28px] h-[28px] flex items-center justify-center rounded bg-[#f0f3f5] text-slate-400 hover:text-blue-600 disabled:opacity-50 transition-colors"
          :disabled="currentPage === 1"
          @click="$emit('pageChange', currentPage - 1)"
        >
          <span class="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        
        <button class="w-[28px] h-[28px] flex items-center justify-center rounded border border-blue-600 text-blue-600 font-bold bg-white">
          {{ currentPage }}
        </button>
        
        <button 
          class="w-[28px] h-[28px] flex items-center justify-center rounded bg-[#f0f3f5] text-slate-400 hover:text-blue-600 disabled:opacity-50 transition-colors"
          :disabled="currentPage === totalPages"
          @click="$emit('pageChange', currentPage + 1)"
        >
          <span class="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  start: Number,
  end: Number,
  total: Number,
  currentPage: Number,
  totalPages: Number,
  pageSize: {
    type: Number,
    default: 50
  }
})

defineEmits(['pageChange', 'update:pageSize'])
</script>
