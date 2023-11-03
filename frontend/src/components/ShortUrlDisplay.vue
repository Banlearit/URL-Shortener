<script setup>
import {ref, watch} from "vue";
const props = defineProps({
  shortUrlData : String
})
const shortUrl = ref('');

// Generate the full short URL for use in the <a> tag
watch(() => props.shortUrlData, (newValue) => {
  shortUrl.value = `http://localhost:3000/${newValue.short}`;
});
</script>

<template>
  <div class="mt-4">
    <div class="mb-2">
      <a :href="shortUrl" target="_blank" class="text-blue-600 hover:underline">{{ shortUrlData.short }}</a>
    </div>
    <div>
      <img :src="shortUrlData.qrCodeImageUrl" alt="QR Code" />
    </div>
  </div>
</template>

<style scoped>

</style>