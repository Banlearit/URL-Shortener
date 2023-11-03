<script setup>
import {ref, watch} from "vue";
const props = defineProps({
  shortUrlData: Object
});
const shortUrl = ref('');

watch(() => props.shortUrlData, (newValue) => {
  if (newValue) {
    shortUrl.value = newValue.shortUrl;
  }
}, { deep: true });
</script>

<template>
  <div class="mt-4" v-if="shortUrlData && shortUrlData.shortUrl">
    <div class="mb-2">
      <a :href="shortUrl" target="_blank" class="text-blue-600 hover:underline">{{ shortUrlData.shortUrl }}</a>
    </div>
    <div v-if="shortUrlData.qrCode">
      <img :src="shortUrlData.qrCode" alt="QR Code" />
    </div>
  </div>
</template>

<style scoped>

</style>