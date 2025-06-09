<template>
  <q-page class="bg-gradient-to-b from-[#fdf6e3] to-[#f5e1c3] min-h-screen">
    <!-- Hero 區塊 -->
    <section
      class="h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <NuxtImg
        src="/your-full-puzzle.jpg"
        alt="拼圖封面"
        class="absolute inset-0 object-cover w-full h-full opacity-20 blur-sm scale-110"
      />
      <div class="z-10 text-center">
        <h1
          class="text-6xl font-extrabold text-[#b58900] drop-shadow-lg tracking-wider mb-4 animate-fade-in"
        >
          拼圖時光
        </h1>
        <p class="text-2xl text-[#657b83] mb-8 animate-fade-in delay-200">
          一塊一塊拼出我的記憶
        </p>
        <q-btn
          color="amber"
          icon="mdi-puzzle-outline"
          to="/puzzleList"
          class="shadow-lg animate-bounce-in"
          >探索所有拼圖</q-btn
        >
      </div>
    </section>

    <!-- 拼圖塊區塊 -->
    <section class="py-24 flex flex-wrap justify-center gap-12 relative">
      <div
        v-for="(block, i) in puzzleBlocks"
        :key="i"
        ref="elements"
        class="transition-all duration-1000 opacity-0 scale-75 rotate-[-8deg] shadow-2xl border-4 border-white bg-white/80 relative"
        :class="[
          visible[i] ? 'opacity-100 scale-100 rotate-0' : '',
          i % 2 === 0 ? 'mt-0' : 'mt-24',
          i % 3 === 0
            ? 'rotate-[-8deg]'
            : i % 3 === 1
            ? 'rotate-[6deg]'
            : 'rotate-[-3deg]',
          'w-72 h-72 flex items-center justify-center rounded-xl',
        ]"
        style="box-shadow: 0 8px 32px 0 rgba(100, 100, 100, 0.18)"
      >
        <NuxtImg
          :src="block.src"
          alt="拼圖塊"
          class="w-64 h-64 object-cover rounded-lg border-2 border-[#eee] shadow-md"
        />
      </div>
    </section>

    <!-- CTA 區塊 -->
    <section
      class="h-[40vh] flex flex-col items-center justify-center text-center bg-[#f5e1c3] mt-12 rounded-t-3xl shadow-inner"
    >
      <h2 class="text-4xl font-bold text-[#b58900] mb-4 animate-fade-in">
        準備好挑戰更多拼圖了嗎？
      </h2>
      <q-btn
        color="primary"
        icon="mdi-puzzle-outline"
        to="/puzzleList"
        class="text-lg px-8 py-3 mt-2 shadow-lg animate-bounce-in"
        >查看拼圖列表</q-btn
      >
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const puzzleBlocks = [
  { src: "/pieces/piece1.png" },
  { src: "/pieces/piece2.png" },
  { src: "/pieces/piece3.png" },
  { src: "/pieces/piece4.png" },
];

const visible = ref<boolean[]>(Array(puzzleBlocks.length).fill(false));
const elements = ref<(HTMLElement | null)[]>([]);
const stops: Array<() => void> = [];

const setupObservers = () => {
  stops.forEach((stop) => stop());
  stops.length = 0;
  elements.value.forEach((el, i) => {
    if (!el) return;
    const stop = useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if (isIntersecting) visible.value[i] = true;
      },
      { threshold: 0.2 }
    );
    stops.push(stop.stop);
  });
};

onMounted(() => {
  nextTick(setupObservers);
});
watch(elements, () => {
  nextTick(setupObservers);
});
onBeforeUnmount(() => {
  stops.forEach((stop) => stop());
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(32px);
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
.animate-fade-in {
  animation: fade-in 1s cubic-bezier(0.4, 0, 0.2, 1) both;
}
.animate-bounce-in {
  animation: bounce-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
}
</style>
