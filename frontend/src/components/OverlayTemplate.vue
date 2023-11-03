<script setup>
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["hideModal"]);
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="showModal"
        class="fixed top-0 left-0 w-full h-full bg-gray-600/50 flex flex-col items-center justify-center z-[999]"
        @click.self="$emit('hideModal')"
      >
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
</style>
