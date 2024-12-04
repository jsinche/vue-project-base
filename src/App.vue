<script setup lang="ts">
import { ref, computed } from 'vue'
const isExpanded = ref(false)
const isPinned = ref(false)

const handleMouseEnter = () => {
  if (!isPinned.value) {
    isExpanded.value = true
  }
}

const handleMouseLeave = () => {
  if (!isPinned.value) {
    isExpanded.value = false
  }
}

const togglePin = () => {
  isPinned.value = !isPinned.value
  if (isPinned.value) {
    isExpanded.value = true
  }
}

const showSidebarDetails = computed(() => isExpanded.value || isPinned.value)

const logout = () => {
  console.log('Cerrando sesión...')
}
</script>
<template>
  <div class="app">
    <aside
      class="app__sidebar"
      :class="{ 'sidebar--expanded': showSidebarDetails }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="sidebar__content">
        <h2 class="sidebar__title">
          <i class="pi pi-check" style="font-size: 1rem"></i>
          <span class="sidebar__title-text" v-if="showSidebarDetails">Menú</span>
        </h2>
        <nav class="sidebar__nav">
          <a href="#" class="sidebar__link">
            <i class="pi pi-chart-bar" style="font-size: 1rem"></i>
            <span class="sidebar__link-text" v-if="showSidebarDetails">Inicio</span>
          </a>
          <a href="#" class="sidebar__link">
            <i class="pi pi-cog" style="font-size: 1rem"></i>
            <span class="sidebar__link-text" v-if="showSidebarDetails">Perfil</span>
          </a>
          <a href="#" class="sidebar__link">
            <i class="pi pi-discord" style="font-size: 1rem"></i>
            <span class="sidebar__link-text" v-if="showSidebarDetails">Configuración</span>
          </a>
        </nav>
        <button @click="togglePin" class="sidebar__pin-button" :aria-pressed="isPinned">
          <i class="pi pi-thumbtack" style="font-size: 1rem"></i>
          <span class="sidebar__pin-text" v-if="showSidebarDetails"
            >{{ isPinned ? 'Desfijar' : 'Fijar' }} sidebar</span
          >
        </button>
      </div>
    </aside>

    <div class="app__main">
      <header class="app__header header">
        <div class="header__container">
          <div class="header__left"></div>

          <div class="header__center">
            <img src="@/assets/logo.svg" alt="Logo" class="header__logo" />
          </div>
        </div>
        <div class="header__logo-container"></div>
        <div class="header__right">
          <button @click="logout" class="header__logout-button">
            <i class="pi pi-sign-out" style="font-size: 1rem"></i>
          </button>
        </div>
      </header>

      <main class="app__content">
        <h1 class="app__title">Contenido de la página</h1>
        <p class="app__text">Este es el contenido principal de tu aplicación.</p>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
}

.app__sidebar {
  width: 60px;
  background-color: #1f2937;
  color: white;
  transition: width 0.3s ease;
  overflow: hidden;
}

.app__sidebar.sidebar--expanded {
  width: 250px;
}

.sidebar__content {
  width: 60px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.sidebar__title-text {
  margin-left: 1rem;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.sidebar__link {
  padding: 0.5rem 1rem;
  color: #d1d5db;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.sidebar__link:hover {
  background-color: #374151;
}

.sidebar__link-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.sidebar__link-text {
  margin-left: 1rem;
}

.sidebar__pin-button {
  margin-top: auto;
  background-color: transparent;
  border: none;
  color: #d1d5db;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem;
  transition: background-color 0.3s;
  border-radius: 0.25rem;
}

.sidebar__pin-button:hover {
  background-color: #374151;
}

.sidebar__pin-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.sidebar__pin-text {
  margin-left: 1rem;
}

.app__main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.app__header {
  display: flex;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header__left,
.header__right {
  margin-left: auto;
}

.header__center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header__logo {
  height: 40px;
}

.header__logout-button {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.header__logout-button:hover {
  background-color: #dc2626;
}

.header__logout-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
}

.app__content {
  flex: 1;
  padding: 1rem;
  overflow: auto;
}

.app__title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.app__text {
  line-height: 1.5;
}
</style>
