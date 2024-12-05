<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
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
  router.push('/login');
  console.log('Cerrando sesión...')
}
</script>
<template>
  <div class="app">
    <aside class="app__sidebar" :class="{ 'sidebar--expanded': showSidebarDetails }" @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave">
      <div class="sidebar__content">
        <h2 class="sidebar__title">
          <img src="@/assets/aws-svgrepo-com.svg" alt="Logo" class="sidebar__logo" />
        </h2>
        <hr class="sidebar__hr" />
        <nav class="sidebar__nav">
          <a href="#" class="sidebar__link">
            <i class="pi pi-chart-bar sidebar__icon"></i>
            <transition name="fade">
              <span class="sidebar__link-text" v-if="showSidebarDetails">Inicio</span>
            </transition>
          </a>
          <a href="#" class="sidebar__link">
            <i class="pi pi-cog sidebar__icon"></i>
            <transition name="fade">
              <span class="sidebar__link-text" v-if="showSidebarDetails">Perfil</span>
            </transition>
          </a>
          <a href="#" class="sidebar__link">
            <i class="pi pi-discord sidebar__icon"></i>
            <transition name="fade">
              <span class="sidebar__link-text" v-if="showSidebarDetails">Configuración</span>
            </transition>
          </a>
        </nav>

        <a @click="togglePin" class="sidebar__pin-button" :aria-pressed="isPinned">
          <i class="pi pi-thumbtack sidebar__icon"></i>
          <transition name="fade">
            <span class="sidebar__pin-text" v-if="showSidebarDetails">
              {{ isPinned ? 'Desfijar' : 'Fijar' }}
            </span>
          </transition>
        </a>
      </div>
    </aside>

    <div class="app__main">
      <header class="app__header header">
        <div class="header__right">
          <button @click="logout" class="header__logout-button">
            <i class="pi pi-sign-out"></i>
          </button>
        </div>
      </header>

      <main class="app__content">
        <RouterView/>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app {
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
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
  position: relative;
}

.app__sidebar {
  width: 100px;
  background-color: #7ac1ca;
  color: white;
  transition: width 0.3s ease;
  overflow: hidden;
}

.app__sidebar.sidebar--expanded {
  width: 250px;
}

.app__content {
  flex: 1;
  padding: 1rem;
  overflow: auto;
}

.app__title {
  font-weight: bold;
  margin-bottom: 1rem;
}

.app__text {
  line-height: 1.5;
}

.header__right {
  margin-left: auto;
  padding: 10px;
}

.header__center {
  flex: 1;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
}

.header__logo {
  height: 80px;
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

.sidebar__content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar__title {
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar__title-text {
  margin-left: 1rem;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
}

.sidebar__link {
  padding: 0.8rem;
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
.sidebar__pin-text,
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
  padding: 0.8rem;
  transition: background-color 0.3s;
  border-radius: 0.25rem;
}

.sidebar__pin-button:hover {
  background-color: #374151;
}

.sidebar__icon {
  font-size: 2.5rem;
}

.sidebar__logo {
  width: 60px;
}

.sidebar__hr {
  margin: 0.5rem;
}
</style>
