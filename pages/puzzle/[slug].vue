<template>
  <q-page class="q-pa-lg">
    <div v-if="artwork" class="q-gutter-md q-mx-auto detail-container">
      <!-- 拼圖圖片 -->
      <q-card flat class="overflow-hidden">
        <q-img
          :src="artwork.image"
          :alt="artwork.name"
          class="full-width"
          style="max-height: 480px"
          fit="cover"
        />
      </q-card>

      <!-- 拼圖標題 -->
      <div class="text-h4 text-primary text-weight-bold">
        {{ artwork.name }}
      </div>

      <!-- 拼圖資訊 -->
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-subtitle1">
            🧩 拼圖片數：
            <span class="text-weight-medium">{{ artwork.pcs }} 片</span>
          </div>
        </q-card-section>
      </q-card>

      <!-- 更多資訊 (可擴充) -->
      <!--
      <q-card>
        <q-card-section>
          <div class="text-subtitle2">作者：{{ author.name }}</div>
          <div class="text-caption q-mt-sm">其他作品也很精彩！</div>
        </q-card-section>
      </q-card>
      -->
    </div>

    <div v-else class="text-negative text-h6 text-center q-mt-xl">
      ❌ 找不到該拼圖
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePuzzleStore } from "@/stores/puzzle";

const route = useRoute();
const puzzleStore = usePuzzleStore();

const slug = route.params.slug as string;
const artwork = computed(() => puzzleStore.findArtworkBySlug(slug));
</script>

<style scoped>
.detail-container {
  max-width: 720px;
}
</style>
