import type anime from "animejs";

declare module "#app" {
  interface NuxtApp {
    $anime: typeof anime;
  }
}

declare module "nuxt/schema" {
  interface RuntimeNuxtApp {
    $anime: typeof anime;
  }
}

export {};
