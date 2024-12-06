<script lang="ts" setup>
import Dialog from 'primevue/dialog';
interface Props {
  title?: string;
  icon?: string;
  width?: string;
}
const alwaysOpen = true;
const props =withDefaults(defineProps<Props>(), {
  title: 'Pruebitas',
  icon: 'pi pi-check-circle',
  width: '40rem',
});
interface Emits {
  (event: "close"): void;
}
const emits = defineEmits<Emits>();
</script>
<template>
  <Dialog
    v-model:visible="alwaysOpen"
    modal
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)'
      }
    }"
    :style="{ width: props.width, fontFamily: 'Montserrat, sans-serif' }"
    >
    <template #container>
      <div class="dialog">
        <div class="dialog__header">
           <div class="dialog__header-content">
             <i class="dialog__icon" :class="props.icon"/>
             <span>{{ props.title }}</span>
           </div>
           <div class="dialog__close" @click="() => emits('close')">
            <i class="pi pi-times dialog__close-icon"></i>
           </div>
        </div>
        <div class="dialog__content">
          <slot name="content"/>
        </div>
        <div class="dialog__footer">
          <slot name="footer"/>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<style>
.p-dialog {
  border: none !important;
}
</style>
<style lang="scss" scoped>
.dialog {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  border-radius: 12px;
  &__header {
    background-color: var(--dialog-header-color);
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    border-radius: 12px 12px 0 0;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
  &__icon {
    font-size: 1.5rem;
  }
  &__close {
    cursor: pointer;
    display: flex;
    background-color: var(--error);
    border-radius: 5px;
    padding: 0.3rem;
    &-icon {
      font-size: 1.2rem;
    }
  }
  &__content {
    padding: 1.25rem;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.25rem;
  }
}
</style>
