<script lang="ts" setup>
import Button from 'primevue/button';
import UpsertUserModal from '../components/UpsertUserModal.vue';
import { ref } from 'vue';
const showModal = ref(false);
</script>
<template>
 <div>Uwu</div>
  <Button
    label="Crear Usuario"
    icon="pi pi-user-plus"
    severity="success"
    @click="showModal = true" />
  <UpsertUserModal
    v-if="showModal"
    @close="showModal = false"
  />
</template>
<style lang="scss" scoped>
</style>
