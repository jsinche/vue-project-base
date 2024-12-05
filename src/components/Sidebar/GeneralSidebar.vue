<script lang="ts" setup>
import { ref, computed } from 'vue'
import { routerLinks } from '@/router/dashboard-routes-list';
const isExpanded = ref(false);
const isPinned = ref(false);
const showSidebarDetails = computed(() => isExpanded.value || isPinned.value);
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
interface Link {
  id: number;
  title: string;
  link: string;
  icon: string;

}
interface MenuItem {
  id: number;
  title: string;
  icon: string;
  isOpen: boolean;
  subitems?: Link[];
};
const menuItems = ref<MenuItem[]>([
  {
    id: 1,
    icon: 'pi pi-home',
    title: 'Dashboard',
    isOpen: false,
    subitems: [
      { id: 11, title: 'Overview', link: '/dashboard', icon: 'pi pi-home' },
      { id: 12, title: 'Analytics', link: '/dashboard/analytics', icon: 'pi pi-chart-bar' },
    ]
  },
  {
    id: 2,
    icon: 'pi pi-home',
    title: 'Proyectos',
    isOpen: false,
    subitems: [
      { id: 21, title: 'Todos los proyectos', link: '/projects', icon: 'pi pi-home' },
      { id: 22, title: 'Añadir proyecto', link: '/projects/new', icon: 'pi pi-home' },
    ]
  },
  {
    id: 3,
    icon: 'pi pi-home',
    title: 'Tareas',
    isOpen: false,
    subitems: [
      { id: 31, title: 'Mis tareas', link: '/tasks', icon: 'pi pi-home' },
      { id: 32, title: 'Asignadas a mí', link: '/tasks/assigned', icon: 'pi pi-home' },
    ]
  }
])
const toggleSubitems = (item: MenuItem) => {
  item.isOpen = !item.isOpen
}

const startTransition = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '0'
  void element.offsetHeight
  element.style.height = element.scrollHeight + 'px'
}

const endTransition = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  void element.offsetHeight
  element.style.height = '0'
}
</script>
<template>
  <aside class="sidebar" :class="{ 'sidebar--expanded': showSidebarDetails }" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <div class="sidebar__content">
      <h2 class="sidebar__title">
        <img src="@/assets/bcp.svg" alt="Logo" class="sidebar__title-logo" />
      </h2>
      <hr class="sidebar__hr" />
      <nav class="sidebar__nav">
        <ul class="sidebar-list">
          <li v-for="item in menuItems" :key="item.id" class="sidebar-item">
            <div
              class="sidebar__nav-link"
              :class="{ 'sidebar-item--is-open': item.isOpen }"
              @click="toggleSubitems(item)"
            >
              <i :class="item.icon" class="sidebar__nav-link-icon"></i>
              <transition name="fade">
                <span
                  class="sidebar__nav-link-text"
                  v-if="showSidebarDetails"
                  :aria-expanded="item.isOpen"
                >{{ item.title }}</span>
              </transition>
            </div>
              <transition
                @enter="startTransition"
                @leave="endTransition"
                >
                <ul v-if="item.isOpen" class="sidebar-sublist">
                  <li v-for="subitem in item.subitems" :key="subitem.id" class="sidebar-subitem">
                    <RouterLink :to="subitem.link" class="sidebar__nav-link">
                      <i :class="subitem.icon" class="sidebar__nav-link-icon"></i>
                      <transition name="fade">
                        <span class="sidebar__nav-link-text" v-if="showSidebarDetails">{{ subitem.title }}</span>
                      </transition>
                    </RouterLink>
                  </li>
                </ul>
              </transition>
          </li>
        </ul>
      </nav>

      <div @click="togglePin" class="sidebar__pin" :aria-pressed="isPinned">
        <i class="pi pi-thumbtack sidebar__pin-icon"></i>
        <transition name="fade">
          <span class="sidebar__pin-text" v-if="showSidebarDetails">
            {{ isPinned ? 'Desfijar' : 'Fijar' }}
          </span>
        </transition>
      </div>
    </div>
  </aside>
</template>
<style lang="scss" scoped>
.sidebar-list {
  list-style-type: none;
  padding: 0;
  margin: 0;

}
.sidebar-item {
  margin-bottom: 4px;
}


.sidebar-item--is-open {
  background-color: var(--secondary-500);
}

.sidebar-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.sidebar-button.is-open .sidebar-icon {
  transform: rotate(180deg);
}

.sidebar-sublist {
  list-style-type: none;
  padding-left: 15px;
  margin-top: 4px;
  overflow: hidden;
  transition: height 0.3s ease;
}

.sidebar-subitem {
  margin-bottom: 4px;
}

.sidebar-link {
  display: block;
  padding: 8px 15px;
  color: #4b5563;
  text-decoration: none;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #e5e7eb;
}

nav a.router-link-active {
  background-color: var(--secondary-500);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

//  Sidebar
.sidebar {
  width: 100px;
  background-color: var(--sidebar-color);
  color: white;
  transition: width 0.3s ease;
  overflow: hidden;

  &--expanded {
    width: 250px;
  }

  &__content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__hr {
    margin: 0.5rem;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 1rem;
  }

  &__pin,
  &__nav-link {
    padding: 0.8rem;
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;

    &-text {
      margin-left: 1rem;
    }

    &-icon {
      font-size: 2.5rem;
    }

    &:hover {
      background-color: var(--secondary-500)
    }
  }

  &__title {
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &-logo {
      width: 60px;
    }
  }
}
</style>
