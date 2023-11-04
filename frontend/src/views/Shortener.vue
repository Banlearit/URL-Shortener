<script setup>
import {ref} from "vue";
import ShortUrlDisplay from "@/components/ShortUrlDisplay.vue";
import OverlayTemplate from "@/components/OverlayTemplate.vue";
import UrlHistory from "@/components/UrlHistory.vue";
const originalUrl = ref('');
const shortUrlData = ref(null);
const showHistory = ref(false);
const historyData = ref([]);
const handleSubmit = async () => {
  try {
    const trimmedUrl = originalUrl.value.replace(/\/$/, '').trim();

    const urlPattern = /^(https?:\/\/)?([a-z\d.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(trimmedUrl)) {
      alert('Please enter a valid URL');
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: trimmedUrl }),
    });

    if (response.ok){
      shortUrlData.value = await response.json();
    } else {
      console.error('Failed to shorten URL');
    }
  } catch (error) {
    alert(error);
  }
};

const fetchHistory = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/history`);
    if (response.ok) {
      const data = await response.json();
      historyData.value = data.result;
    } else {
      console.error('Failed to fetch history');
    }
  } catch (error) {
    alert(error.message);
  }
};
const toggleHistory = () => {
  showHistory.value = !showHistory.value;
  if (showHistory.value) {
    fetchHistory();
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#132043]">
    <h1 class="text-center text-4xl font-bold text-white mb-4">ShortURL</h1>
    <div class="w-full max-w-md p-4 bg-white shadow-md rounded">
      <div class="mb-4">
        <input
            v-model="originalUrl"
            type="text"
            placeholder="Enter URL to shorten"
            class="border p-2 mr-2 w-full"
            @keyup.enter="handleSubmit"
        />
        <button @click="handleSubmit"
                class="bg-[#1F4172] hover:bg-[#132043] text-white font-bold py-2 px-4 rounded w-full mt-2">
          Shorten URL
        </button>
      </div>
      <ShortUrlDisplay v-if="shortUrlData" :short-url-data="shortUrlData" />
      <OverlayTemplate :showModal="showHistory" @hideModal="toggleHistory">
        <UrlHistory :history-data="historyData" @hideModal="toggleHistory"/>
      </OverlayTemplate>
      <div class="flex items-center justify-center w-full mt-4">
        <button @click="toggleHistory"
                class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
          Show History
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped>

</style>