<template>
  <q-card class="col-12 col-sm-6 col-md-4 my-card">
    <NuxtLink :to="`/puzzle/${artwork.slug}`" class="card-link">
      <div class="image-wrapper bg-grey-3">
        <!-- 預設圖片 -->
        <div class="q-pa-md q-pb-xl h-full">
          <div class="shadow-3 q-pa-md h-full bg-white">
            <q-img
              :src="artwork.image"
              :alt="artwork.name"
              class="base-image h-full"
              fit="cover"
            />
          </div>
        </div>

        <!-- Hover 圖片 -->
        <q-img
          :src="artwork.hoverImage"
          :alt="artwork.name"
          class="fade-image hover-image q-pa-md h-full"
          fit="cover"
        >
          <div class="absolute-bottom text-subtitle2 text-center card-label">
            {{ artwork.pcs }}片 - {{ artwork.name }}
          </div>
        </q-img>

        <!-- 卡片底部標籤（非 hover 狀態下顯示） -->
        <div
          class="absolute-bottom text-subtitle2 text-center card-label base-label"
        >
          {{ artwork.pcs }}片 - {{ artwork.name }}
        </div>
      </div>
    </NuxtLink>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  artwork: {
    pcs: number;
    name: string;
    image: string;
    hoverImage: string;
    slug: string;
  };
}>();
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 344px;
  max-height: 400px;
  overflow: hidden;
}

.card-link {
  text-decoration: none;
}

.image-wrapper {
  position: relative;
  height: 400px;
}

.fade-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 0.6s ease-in-out;
  opacity: 1;
  z-index: 1;
}

.hover-image {
  opacity: 0;
  z-index: 2;
}

.image-wrapper:hover .hover-image {
  opacity: 1;
}

.image-wrapper:hover .base-image,
.image-wrapper:hover .base-label {
  opacity: 0;
}

.base-image,
.base-label {
  transition: opacity 0.6s ease-in-out;
}

.card-label {
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 12px;
  z-index: 3;
}
</style>
