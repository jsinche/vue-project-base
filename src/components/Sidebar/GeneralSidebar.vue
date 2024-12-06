<script lang="ts" setup>
import { ref, computed } from 'vue'
import { routerLinks } from '@/router/dashboard-routes-list';
import { useRoute } from 'vue-router';
const route = useRoute();
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
      { id: 11, title: 'Overview', link: '/dashboard/users/list', icon: 'pi pi-home' },
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

const isParentActive = (item: MenuItem) => {
  console.log(route.path);
  return item.subitems?.some((subitem) => subitem.link === route.path);
};
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
        <ul class="sidebar__list">
          <li v-for="item in menuItems" :key="item.id">
            <div class="sidebar__list-item" :class="{
              'sidebar__list-item--is-open': item.isOpen,
              'sidebar__list-item--is-active': isParentActive(item)
            }" @click="toggleSubitems(item)">
              <i :class="item.icon" class="sidebar__list-item-icon"></i>
              <transition name="fade">
                <span class="sidebar__list-item-text" v-if="showSidebarDetails" :aria-expanded="item.isOpen">
                  {{ item.title }}
                  <i class="pi pi-angle-down angle-icon" :class="{ 'angle-icon--is-open': item.isOpen }"></i>
                </span>
              </transition>
            </div>
            <transition @enter="startTransition" @leave="endTransition">
              <ul v-if="item.isOpen" class="sidebar__sublist">
                <li v-for="subitem in item.subitems" :key="subitem.id" class="sidebar__sublist-item">
                  <RouterLink :to="subitem.link" class="sidebar__sublist-item-link">
                    <i :class="subitem.icon" class="sidebar__sublist-item-icon"></i>
                    <transition name="fade">
                      <span class="sidebar__sublist-item-text" v-if="showSidebarDetails">{{ subitem.title }}</span>
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

  &__list {
    list-style-type: none;
    padding: 0;
    margin: 0;

    &-item {
      margin: 0.5rem;
      cursor: pointer;
      padding: 0.8rem;
      color: white;
      text-decoration: none;
      border-radius: 0.25rem;
      transition: background-color 0.3s;
      display: flex;
      align-items: center;
      &:hover {
        background-color: var(--white-20);
      }
      &--is-open {
        background-color: var(--white-20);
      }

      &--is-active {
        background-color: var(--secondary-500);
        &:hover {
          background-color: var(--secondary-500);
        }
      }

      &-text {
        margin-left: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      &-icon {
        font-size: 2rem;
      }

    }
  }

  &__sublist {
    list-style-type: none;
    padding-left: 15px;
    margin-top: 4px;
    overflow: hidden;
    transition: height 0.3s ease;

    &-item {
      margin: 0.5rem;
      border-radius: 0.25rem;

      &-link {
        padding: 1rem;
        color: white;
        text-decoration: none;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
      }

      &-text {
        margin-left: 1rem;
      }

      &-icon {
        font-size: 1.5rem;
      }

      &:hover {
        border-radius: 0.25rem;
        background-color: var(--white-20);
      }
    }
  }

  &__pin {
    padding: 0.8rem;
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    cursor: pointer;

    &-text {
      margin-left: 1rem;
    }

    &-icon {
      font-size: 2.5rem;
    }

    &:hover {
      background-color: var(--white-20)
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

  .angle-icon {
    transition: transform 0.3s ease;

    &--is-open {
      transform: rotate(180deg);
    }
  }
}
</style>
