<template>
  <div class="w-full h-full overflow-auto rounded-lg border bg-white shadow-sm font-sans" :style="{ borderColor: tableStyles.borderColor }">
    <table class="w-full text-left border-collapse text-[13px] text-slate-800">
      <thead class="sticky top-0 shadow-sm z-10" :style="{ backgroundColor: tableStyles.headerBg }">
        <tr>
          <th v-if="selectable" class="px-3 py-[10px] border-r border-b w-[40px] text-center align-middle" :style="{ borderColor: tableStyles.headerBorder }">
            <div class="flex items-center justify-center">
              <input type="checkbox" 
                     class="rounded-[3px] bg-white text-blue-600 focus:ring-0 cursor-pointer w-[18px] h-[18px] transition-colors" 
                     :style="{ borderColor: tableStyles.checkboxBorder }"
                     @change="toggleAll" 
                     :checked="isAllSelected" />
            </div>
          </th>
          <th 
            v-for="(col, idx) in columns" 
            :key="col.key"
            class="px-3 py-[10px] border-r border-b font-bold text-slate-800 select-none transition-colors whitespace-nowrap"
            :class="[
              { 'cursor-pointer hover:opacity-80': col.sortable },
              idx === columns.length - 1 ? 'border-r-0' : ''
            ]"
            :style="{ borderColor: tableStyles.headerBorder, width: col.width, minWidth: col.minWidth }"
            @click="col.sortable ? handleSort(col.key) : null"
          >
            <div class="flex items-center gap-1.5" :class="col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start'">
              <span>{{ col.label ? $t(col.label) : '' }}</span>
              <div v-if="col.sortable" class="flex flex-col opacity-50 ml-1 gap-[2px]">
                <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor" :class="{ 'text-blue-700 opacity-100': sortBy === col.key && sortDesc === false }">
                  <path d="M5 0L10 6H0L5 0Z" />
                </svg>
                <svg width="8" height="5" viewBox="0 0 10 6" fill="currentColor" :class="{ 'text-blue-700 opacity-100': sortBy === col.key && sortDesc === true }">
                  <path d="M5 6L0 0H10L5 6Z" />
                </svg>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!data || data.length === 0">
          <td :colspan="selectable ? columns.length + 1 : columns.length" class="px-4 py-8 text-center text-slate-400 italic">
            <slot name="empty">Không có dữ liệu</slot>
          </td>
        </tr>
        <tr 
          v-for="(row, index) in data" 
          :key="rowKey ? row[rowKey] : index"
          class="transition-colors group hover:bg-[#ebf4fa] border-b last:border-b-0"
          :class="{ '!bg-[#ddecfa]': isSelected(row) }"
          :style="{ 
            backgroundColor: isSelected(row) ? undefined : (index % 2 === 1 ? tableStyles.stripeBg : '#ffffff'),
            borderColor: tableStyles.rowBorder 
          }"
        >
          <td v-if="selectable" class="px-[6px] py-[3px] border-r text-center align-middle" :style="{ borderColor: tableStyles.rowBorder, backgroundColor: 'inherit' }">
            <div class="flex items-center justify-center">
              <input type="checkbox" 
                     class="rounded-[3px] bg-white text-blue-600 focus:ring-0 cursor-pointer w-[18px] h-[18px] transition-colors" 
                     :style="{ borderColor: tableStyles.borderColor }"
                     :value="row" 
                     v-model="selectedRows" />
            </div>
          </td>
          <td 
            v-for="(col, idx) in columns" 
            :key="col.key"
            class="px-[6px] py-1 border-r align-middle"
            :class="[
              idx === columns.length - 1 ? 'border-r-0' : '',
              col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
              { 'text-blue-600 font-semibold': col.type === 'link' || col.isPrimary }
            ]"
            :style="{ borderColor: tableStyles.rowBorder, backgroundColor: 'inherit' }"
          >
            <slot :name="`cell-${col.key}`" :row="row" :column="col" :index="index">
              <template v-if="col.type === 'image-text'">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200">
                    <img v-if="row[col.imageKey || 'imageUrl']" :src="row[col.imageKey || 'imageUrl']" class="w-full h-full object-cover"/>
                  </div>
                  <span class="font-medium text-slate-900 break-words line-clamp-2" :title="row[col.key]">{{ row[col.key] }}</span>
                </div>
              </template>
              <template v-else-if="col.type === 'badge'">
                <span class="px-2 py-0.5 rounded-sm text-[0.625rem] font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-600 whitespace-nowrap max-w-full inline-block truncate">{{ row[col.key] }}</span>
              </template>
              <template v-else-if="col.type === 'currency'">
                <span class="font-medium text-slate-900 whitespace-nowrap">{{ col.prefix || '$' }}{{ Number(row[col.key]).toFixed(2) }}</span>
              </template>
              <template v-else-if="col.type === 'stock'">
                <span class="font-medium whitespace-nowrap" :class="Number(row[col.key]) < 20 ? 'text-red-500 font-bold' : 'text-slate-600'">{{ row[col.key] }}</span>
              </template>
              <template v-else-if="col.type === 'actions'">
                <div class="flex items-center gap-0.5" :class="col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : 'justify-start'">
                  <template v-for="(act, aIdx) in col.actions" :key="aIdx">
                    <NuxtLink v-if="act.to" :to="act.to(row)" class="p-1 rounded-md transition-all flex items-center justify-center" :class="act.colorClass || 'text-slate-700 hover:bg-slate-100'" :title="act.title">
                      <span class="material-symbols-outlined text-[17px]">{{ act.icon }}</span>
                    </NuxtLink>
                    <button v-else @click="act.onClick ? act.onClick(row) : null" class="p-1 rounded-md transition-all flex items-center justify-center" :class="act.colorClass || 'text-slate-700 hover:bg-slate-100'" :title="act.title">
                      <span class="material-symbols-outlined text-[17px]">{{ act.icon }}</span>
                    </button>
                  </template>
                </div>
              </template>
              <template v-else-if="col.prefix">
                <span class="font-mono text-slate-500 break-words line-clamp-2" :title="row[col.key]">{{ col.prefix }}{{ row[col.key] }}</span>
              </template>
              <template v-else>
                <div class="break-words line-clamp-2" :title="row[col.key]">{{ row[col.key] }}</div>
              </template>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const tableStyles = {
  headerBg: '#cbd5e1',
  stripeBg: '#f0f3f5',
  borderColor: '#cbd5e1',
  headerBorder: '#b1bfd1',
  rowBorder: '#e2e8f0',
  checkboxBorder: '#94a3b8'
}

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  rowKey: String,
  selectable: Boolean,
  modelValue: Array
})

const emit = defineEmits(['update:modelValue', 'sort'])

const selectedRows = ref([])

watch(() => props.modelValue, (newVal) => {
  if (newVal) selectedRows.value = newVal
}, { immediate: true })

watch(selectedRows, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

const isAllSelected = computed(() => {
  return props.data && props.data.length > 0 && selectedRows.value.length === props.data.length
})

function toggleAll(e) {
  const target = e.target
  if (target.checked) {
    selectedRows.value = [...props.data]
  } else {
    selectedRows.value = []
  }
}

const sortBy = ref(null)
const sortDesc = ref(false)

function handleSort(key) {
  if (sortBy.value === key) {
    if (sortDesc.value) {
      sortBy.value = null
      sortDesc.value = false
    } else {
      sortDesc.value = true
    }
  } else {
    sortBy.value = key
    sortDesc.value = false
  }
  emit('sort', sortBy.value || '', sortDesc.value)
}

function isSelected(row) {
  if (!props.rowKey) return selectedRows.value.includes(row)
  return selectedRows.value.some(r => r[props.rowKey] === row[props.rowKey])
}
</script>
