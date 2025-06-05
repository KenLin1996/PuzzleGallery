<template>
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

<style scoped></style>
