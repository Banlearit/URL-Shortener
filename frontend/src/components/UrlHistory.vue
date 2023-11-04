<script setup>
import {computed, ref} from "vue";

const props = defineProps({
  historyData: {
    type: Array
  }
})
const searchQuery = ref('');

function includesIgnoreCase(source, search) {
  return source.toLowerCase().includes(search.toLowerCase());
}

const filteredHistoryData = computed(() =>
    searchQuery.value.trim()
        ? props.historyData.filter(
            (item) =>
                includesIgnoreCase(item.full, searchQuery.value.trim()) ||
                includesIgnoreCase(item.short, searchQuery.value.trim()),
        )
        : props.historyData,
);

defineEmits(['hideModal']);
</script>
<template>
  <div class="relative w-full max-w-5xl mx-auto"
       :class="{ 'max-w-3xl': historyData && historyData.length, 'max-w-xs': !historyData || !historyData.length }">
    <div class="relative rounded-lg shadow bg-[#1F4172] text-white max-h-[60vh] overflow-auto">
    <button
        @click="$emit('hideModal')"
        type="button"
        class="absolute top-3 right-2.5 text-white bg-transparent hover:bg-[#1F4172] hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
    >
      <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="white"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            fill="white"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Close modal</span>
    </button>
      <!-- Data table -->
      <div class="p-3">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search history..."
            class="w-1/2 p-2 rounded-lg text-black"
        />
      </div>
        <div v-if="filteredHistoryData && filteredHistoryData.length" class="p-6 w-full">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th class="pb-4">Full URL</th>
              <th class="pb-4">Short URL</th>
              <th class="pb-4">Clicks</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in filteredHistoryData" :key="index" class="hover:bg-[#2a507d]">
              <td class="py-2">{{ item.full }}</td>
              <td class="py-2">{{ item.short }}</td>
              <td class="py-2">{{ item.clicks }}</td>
            </tr>
            </tbody>
          </table>
      </div>
      <div v-else class="text-center p-6">
        <p>No history</p>
      </div>
  </div>
  </div>
</template>

<style scoped>
table {
  border-spacing: 0;
}
th {
  text-transform: uppercase;
  font-size: 0.85em;
  letter-spacing: 0.1em;
}
td, th {
  border-bottom: 1px solid #3c5a77;
  padding: 0.5em 1em;
}
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: #0F0F0F;
  border-radius: 15px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}


::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

</style>