<script lang="ts" setup>
import MyCustomModal from '@/components/Modal/MyCustomModal.vue';
import Button from 'primevue/button';
interface Emits {
  (event: "close"): void;
}
const emits = defineEmits<Emits>();
</script>
<template>
  <MyCustomModal
    title="Pruebitas"
    icon="pi pi-check-circle"
    width="40rem"
    @close="emits('close')"
  >
    <template #content>
      <div>Pruebitas</div>
    </template>
    <template #footer>
      <Button label="Close" severity="danger" @click="emits('close')" />
      <Button label="Save" severity="success" @click="emits('close')" />
    </template>
  </MyCustomModal>
</template>
<style lang="scss" scoped>
</style>
