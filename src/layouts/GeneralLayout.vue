<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import GeneralSidebar from '@/components/Sidebar/GeneralSidebar.vue';
const toast = useToast();
const menu = ref();
interface MenuItem {
  label: string;
  icon: string;
  command?: () => void;
}
const menuItems : MenuItem[] = [
  {
    label: 'Perfil',
    icon: 'pi pi-user'
  },
  {
    label: 'Configuración',
    icon: 'pi pi-cog'
  },
  {
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => logout()
  }
];
const showLogoutToast = () => {
  toast.add({ severity: 'success', summary: 'Buen trabajo', detail: 'Sesión cerrada con éxito', life: 3000 });
};
const router = useRouter();
const toggle = (event : MouseEvent) => {
  menu.value.toggle(event);
};

const logout = () => {
  showLogoutToast();
  router.push('/login');
  console.log('Cerrando sesión...')
}
</script>
<template>
  <div class="app">
    <GeneralSidebar />
    <div class="app__main">
      <header class="app__header header">
        <div class="header__right">
          <div class="user-info" @click="toggle" aria-haspopup="true"
          aria-controls="overlay_menu">
            <div class="user-info__details">
              <span class="user-info__name">Jean Sinche</span>
              <span class="user-info__rol">Administrador</span>
            </div>
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="user-info__icon" size="xlarge" shape="circle" />
          </div>
          <Menu id="overlay_menu" ref="menu" popup :model="menuItems" />
        </div>
      </header>

      <main class="app__content">
        <RouterView />
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


.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.user-info__details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.user-info__name {
  font-weight: 600;
}

.user-info__rol {
  color: #2557b9;
  font-weight: 600;
}

</style>
