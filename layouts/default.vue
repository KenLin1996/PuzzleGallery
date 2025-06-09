<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      reveal
      class="bg-gradient-to-r from-[#fdf6e3] to-[#f5e1c3] shadow-md rounded-b-2xl border-b-2 border-[#f5e1c3] px-4 py-2"
      height-hint="68"
    >
      <q-toolbar class="min-h-[68px] bg-transparent rounded-t-3xl shadow-none">
        <NuxtLink to="/" class="mr-lg flex items-center gap-2 no-underline">
          <q-avatar
            size="64px"
            class="shadow-lg border-2 border-[#b58900] bg-white"
          >
            <img :src="logo2" />
          </q-avatar>
          <span
            class="font-extrabold text-2xl text-[#b58900] tracking-wider"
            style="
              text-shadow: 0 2px 8px #f5e1c3;
              animation: fade-in 1s cubic-bezier(0.4, 0, 0.2, 1) both;
            "
          >
            拼圖時光
          </span>
        </NuxtLink>
        <q-space />
        <div class="flex items-center gap-4">
          <template v-for="tab in navTabs" :key="tab.name">
            <q-btn
              align="between"
              :label="tab.name"
              :icon="tab.icon"
              :to="tab.to"
              class="font-bold border-2 border-amber-200 bg-white/85 text-[#b58900] hover:bg-amber-200 hover:text-white transition-shadow shadow-md hover:shadow-lg rounded-full text-lg"
              style="
                animation: bounce-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
              "
              flat
              rounded
              size="lg"
              @click="setSelectedAuthor(null)"
            />
          </template>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import logo2 from "/public/logo2.png";
import { usePuzzleStore } from "@/stores/puzzle";

const puzzleStore = usePuzzleStore();

const navTabs = [
  { name: "所有拼圖", icon: "mdi-puzzle-outline", to: "/puzzleList" },
  { name: "排行榜", icon: "mdi-stairs-up", to: "/" },
];

const setSelectedAuthor = puzzleStore.setSelectedAuthor;
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  60% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
</style>
