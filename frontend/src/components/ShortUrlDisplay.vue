<script setup>
import {ref, watch} from "vue";
const props = defineProps({
  shortUrlData: Object
});
const shortUrl = ref('');
const copySuccess = ref('');

watch(() => props.shortUrlData, (newValue) => {
  if (newValue) {
    shortUrl.value = newValue.shortUrl;
  }
}, { deep: true });
const copyToClipboard = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    copySuccess.value = 'URL Copied!';
    setTimeout(() => {
      copySuccess.value = '';
    }, 2000);
  } catch (err) {
    copySuccess.value = 'Failed to copy';
  }
};
</script>

<template>
  <div class="text-center mt-4" v-if="shortUrlData && shortUrlData.shortUrl">
    <div class="mb-2">
      <div class="inline-block relative">
        <a :href="shortUrlData.shortUrl" target="_blank" class="text-blue-600 hover:underline">{{ shortUrlData.shortUrl }}</a>
        <button
            @click="copyToClipboard(shortUrlData.shortUrl)"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l-none border-l-0 ml-3"
        >
          Copy
        </button>
      </div>
      <div v-if="copySuccess" class="copy-message mt-2">{{ copySuccess }}</div>
    </div>
    <div v-if="shortUrlData.qrCode" class="flex justify-center mt-2">
      <img :src="shortUrlData.qrCode" alt="QR Code" class="mx-auto" />
    </div>
  </div>
</template>

<style scoped>
.copy-message {
  background-color: #e0e0e0;
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  display: block;
  margin-top: 8px;
}
</style>