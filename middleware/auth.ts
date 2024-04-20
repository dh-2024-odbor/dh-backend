import { useAuth0 } from '@auth0/auth0-vue'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return

  const { isAuthenticated, checkSession } = useAuth0()
  await checkSession()

  if (isAuthenticated.value) {
    return
  }
  console.log('Not authenticated. Redirecting to /.')

  return navigateTo('/')
})