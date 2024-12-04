<script setup lang="ts">
import { ref, computed } from 'vue'
import General from './layouts/General.vue';
import { useRoute } from 'vue-router';
const isExpanded = ref(false)
const isPinned = ref(false)
const route = useRoute();
</script>
<template>
  <General v-if="route.meta.general"/>
  <router-view v-else/>
</template>

<style scoped>
</style>
