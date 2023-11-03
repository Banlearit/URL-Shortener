<script setup>
import {ref} from "vue";
import ShortUrlDisplay from "@/components/ShortUrlDisplay.vue";
import UrlHistory from "@/components/UrlHistory.vue";
const originalUrl = ref('');
const shortUrlData = ref(null);

const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:3000/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullUrl: originalUrl.value }),
    });
    if (response.ok){
      shortUrlData.value = await response.json()
    }
  } catch (error) {
    alert(error);
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="mb-6">
      <input
          v-model="originalUrl"
          type="text"
          placeholder="Enter URL to shorten"
          class="border p-2 mr-2 w-full"
      />
      <button @click="handleSubmit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Shorten URL
      </button>
    </div>

    <ShortUrlDisplay v-if="shortUrlData" :short-url-data="shortUrlData.value" />

    <UrlHistory />
  </div>
</template>

<style scoped>

</style>