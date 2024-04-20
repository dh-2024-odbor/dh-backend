export default defineEventHandler((event) => {
  console.log(`[HTTP] ${getRequestURL(event)}`)
})