export default defineNuxtRouteMiddleware((to, from) => {
  const routes = ["/", "/services", "/portfolio", "/about"];

  const fromIndex = routes.indexOf(from?.path || "/");
  const toIndex = routes.indexOf(to.path);

  if (fromIndex !== -1 && toIndex !== -1) {
    const direction = toIndex > fromIndex ? "forward" : "backward";

    if (process.client) {
      document.documentElement.style.setProperty(
        "--transition-direction",
        direction
      );
    }
  }
});
