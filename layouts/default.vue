<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      reveal
      class="bg-white text-grey-8 q-px-sm q-py-sm b-3 shadow-sm"
      height-hint="58"
    >
      <q-toolbar style="background-color: white">
        <NuxtLink to="/" class="q-mr-md">
          <q-avatar size="60px">
            <img :src="logo2" />
          </q-avatar>
        </NuxtLink>

        <q-space />

        <div class="q-gutter-sm">
          <template v-for="tab in navTabs">
            <q-btn
              align="between"
              :label="tab.name"
              :icon="tab.icon"
              :to="tab.to"
              flat
              outline
              @click="setSelectedAuthor(null)"
            ></q-btn>
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
<style scoped></style>
