<script setup lang="ts">
import { ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Password from 'primevue/password'
import InputText from 'primevue/inputtext'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
const toast = useToast()
const email = ref('')
const password = ref('')
const router = useRouter()
const confirm = useConfirm()
const showLoginToast = () => {
  toast.add({
    severity: 'success',
    summary: 'Buen trabajo',
    detail: 'Sesión iniciada con éxito',
    life: 3000,
  })
}
const confirm1 = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Save',
    accept: () => {
      handleLogin()
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    },
  })
}
const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    showLoginToast()
    router.push('/dashboard')
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-content">
        <img src="@/assets/bcp.svg" alt="Login illustration" class="login-content__right-image" />
        <div class="login-content__left">
          <!-- <div class="login-content__intro">
            <h2 class="login-content__title">Bienvenido de vuelta</h2>
            <p class="login-content__text">Inicia sesión para continuar tu viaje con nosotros.</p>
          </div> -->
          <img
            src="@/assets/login-image.svg"
            alt="Login illustration"
            class="login-content__image"
          />
          <!-- <div class="login-content__quote">
            <p class="login-content__quote-text">
              "El éxito es la suma de pequeños esfuerzos repetidos día tras día."
            </p>
            <p class="login-content__quote-author">- Robert Collier</p>
          </div> -->
        </div>

        <div class="login-content__right">
          <div class="login-content__header"></div>
          <div class="login-content__form">
            <h2 class="login-form__title">Bienvenido a AWS</h2>
            <p class="login-form__text">
              Por favor ingrese su correo electrónico y contraseña para continuar.
            </p>
            <form @submit.prevent="confirm1" class="login-form">
              <div class="login-form__group">
                <label for="email" class="login-form__label">Correo electrónico</label>
                <InputText id="email" v-model="email" />
              </div>
              <div class="login-form__group">
                <label for="password" class="login-form__label">Contraseña</label>
                <Password
                  v-model="password"
                  :feedback="false"
                  toggleMask
                  :input-style="{ width: '100%' }"
                />
              </div>
              <div class="login-form__options">
                <div class="login-form__checkbox">
                  <input id="remember-me" type="checkbox" class="login-form__checkbox-input" />
                  <label for="remember-me" class="login-form__checkbox-label">Recordarme</label>
                </div>
                <a href="#" class="login-form__link">¿Olvidaste tu contraseña?</a>
              </div>
              <div>
                <button type="submit" class="login-form__button">Iniciar sesión</button>
              </div>
            </form>
            <p class="login-form__footer">
              ¿No tienes una cuenta?
              <a href="#" class="login-form__footer-link">Regístrate</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-content__header {
  background-color: var(--login-background-color);
  height: 120px;
  width: 100%;
  display: none;
}
.login-content__form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  flex-grow: 1;
}
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
}

.login-container {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  overflow: hidden;
  display: flex;
}

.login-content {
  min-height: 100vh;
  display: flex;
  width: 100%;
}

.login-content__left {
  background-color: var(--login-background-color);
  color: white;
  flex: 1 1 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.login-content__title {
  margin-bottom: 1rem;
}

.login-content__text {
  margin-bottom: 1rem;
}

.login-content__image {
  width: 400px;
}

.login-content__quote {
}

.login-content__quote-author {
  margin-top: 0.5rem;
}

.login-content__right {
  flex: 1 1 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-content__right-image {
  width: 100px;
  position: absolute;
  left: 5%;
  top: 5%;
  z-index: 2;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form__title {
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.login-form__group {
  display: flex;
  flex-direction: column;
}

.login-form__label {
  margin-bottom: 0.5rem;
}

.login-form__input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  background-color: #f9fafb;
}

.login-form__input:focus {
  border-color: #2563eb;
  outline: none;
}

.login-form__options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-form__checkbox {
  display: flex;
  align-items: center;
}

.login-form__checkbox-input {
  margin-right: 0.5rem;
}

.login-form__checkbox-label {
}

.login-form__link {
  color: #2563eb;
  text-decoration: none;
}

.login-form__link:hover {
  text-decoration: underline;
}

.login-form__button {
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.login-form__button:hover {
  background-color: #1d4ed8;
}

.login-form__footer {
  text-align: center;
  color: #6b7280;
}

.login-form__footer-link {
  color: #2563eb;
  text-decoration: none;
}

.login-form__footer-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-content__header {
    display: block;
  }

  .login-content__left {
    display: none;
  }

  .login-content__right {
    flex: 1 1 100%;
  }
}
</style>
