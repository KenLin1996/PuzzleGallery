<!-- <template>
  <q-drawer show-if-above bordered class="bg-grey-2" :width="280">
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item
          clickable
          @click="setSelectedAuthor(null)"
          class="font-size-4 text-weight-bold"
        >
          <q-item-section>顯示所有拼圖</q-item-section>
        </q-item>
      </q-list>

      <q-list bordered class="rounded-borders">
        <template v-for="(brand, bIndex) in totalPuzzle" :key="bIndex">
          <q-expansion-item
            v-if="brand.authors.length"
            expand-separator
            :label="brand.brand"
            icon="mdi-puzzle-outline"
            default-opened
          >
            <template v-for="author in brand.authors" :key="author.slug">
              <q-expansion-item
                :header-inset-level="1"
                expand-separator
                @click="setSelectedAuthor(author)"
              >
                <template #header>
                  <q-item-section avatar>
                    <q-avatar><img :src="author.image" /></q-avatar>
                  </q-item-section>
                  <q-item-section>{{ author.name }}</q-item-section>
                </template>

                <template
                  v-for="artwork in author.artworks"
                  :key="artwork.slug"
                >
                  <q-item clickable :to="`/puzzle/${artwork.slug}`">
                    <q-item-section class="text-center">
                      <q-item-label> {{ artwork.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-expansion-item>
            </template>
          </q-expansion-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>

  <q-page padding>
    <div class="font-size-5 color-teal-600 font-bold q-mb-md">
      {{ selectedAuthor ? selectedAuthor.name : "所有拼圖" }}
    </div>

    <div class="q-pa-md row items-center q-gutter-md">
      <PuzzleCard
        v-for="artwork in filteredArtworks"
        :key="artwork.slug"
        :artwork="artwork"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePuzzleStore } from "@/stores/puzzle";
import PuzzleCard from "@/components/PuzzleCard.vue";

const puzzleStore = usePuzzleStore();

const { totalPuzzle, selectedAuthor, filteredArtworks } =
  storeToRefs(puzzleStore);
const setSelectedAuthor = puzzleStore.setSelectedAuthor;
</script>

<style scoped></style> -->

<!-- 第二 -->
<template>
  <div class="px-4 max-w-screen-lg mx-auto py-2">
    <!-- Hero 區塊 -->
    <section
      class="text-center py-14 bg-gray-100 dark:bg-dark rounded-2xl shadow-md mb-10"
    >
      <h1 class="text-4xl font-bold mb-4">我的拼圖收藏</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        精選藝術家插畫 x 品牌拼圖，慢慢拼出療癒日常
      </p>
    </section>

    <!-- 作者區塊 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">拼圖藝術家</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Motion
          v-for="author in authors"
          :key="author.slug"
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 0.1 } }"
        >
          <div
            class="p-4 border rounded-xl hover:shadow-lg transition bg-white dark:bg-dark-soft"
          >
            <q-avatar size="80px" class="mb-2 mx-auto">
              <img :src="author.image" :alt="author.name" />
            </q-avatar>
            <h3 class="text-lg font-medium text-center">{{ author.name }}</h3>
            <p class="text-sm text-gray-500 text-center">
              共 {{ author.artworks.length }} 款拼圖
            </p>
          </div>
        </Motion>
      </div>
    </section>

    <!-- 精選拼圖區塊 -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">精選拼圖</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <Motion
          v-for="artwork in featuredArtworks"
          :key="artwork.slug"
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 120 },
          }"
        >
          <NuxtLink :to="`/puzzle/${artwork.slug}`">
            <div
              class="relative group overflow-hidden rounded-xl shadow hover:shadow-xl transition"
            >
              <img
                :src="artwork.image"
                :alt="artwork.name"
                class="w-full h-48 object-cover transition duration-300 group-hover:opacity-0"
              />
              <img
                :src="artwork.hoverImage"
                :alt="artwork.name"
                class="absolute inset-0 w-full h-48 object-cover opacity-0 group-hover:opacity-100 transition duration-300"
              />
            </div>
            <div class="p-2 text-sm text-center">{{ artwork.name }}</div>
          </NuxtLink>
        </Motion>
      </div>
    </section>

    <!-- CTA -->
    <div class="text-center">
      <q-btn
        color="primary"
        label="查看所有拼圖"
        to="/puzzleList"
        unelevated
        class="text-lg px-6 py-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePuzzleStore } from "@/stores/puzzle";

const puzzleStore = usePuzzleStore();

// 撈出所有作者（展開品牌與作者）
const authors = puzzleStore.totalPuzzle.flatMap((brand) => brand.authors);

// 精選前 4 張作品
const featuredArtworks = puzzleStore.totalPuzzle
  .flatMap((brand) => brand.authors.flatMap((a) => a.artworks))
  .slice(0, 4);
</script>
