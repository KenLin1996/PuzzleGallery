import { ref, computed } from "vue";
import { defineStore } from "pinia";
import littleOilArt from "@/assets/authorImg/littleOilArt.png";
import boptop from "@/assets/authorImg/boptop.jpg";

import warmMoon from "@/assets/littleOilArt_works/馨月.png";
import warmMoon2 from "@/assets/littleOilArt_works/馨月2.png";
import blackCatChristmas from "@/assets/littleOilArt_works/blackCatChristmas.png";
import blackCatChristmas2 from "@/assets/littleOilArt_works/blackCatChristmas2.png";

import WhispersWithYou from "@/assets/littleOilArt_works/WhispersWithYou.png";

import WhispersWithYou2 from "@/assets/littleOilArt_works/WhispersWithYou2.png";
import catByWindow from "@/assets/littleOilArt_works/catByWindow.png";
import catByWindow2 from "@/assets/littleOilArt_works/catByWindow2.png";
import blackCatOfTangDynasty from "@/assets/boptop_works/blackCatOfTangDynasty.png";
import blackCatOfTangDynasty2 from "@/assets/boptop_works/blackCatOfTangDynasty2.png";

export interface Artwork {
  pcs: number;
  name: string;
  image: string;
  hoverImage: string;
  slug: string;
}

export interface Author {
  name: string;
  image: string;
  slug: string;
  artworks: Artwork[];
}

export interface Brand {
  brand: string;
  authors: Author[];
}

export const usePuzzleStore = defineStore("puzzle", () => {
  const totalPuzzle = ref<Brand[]>([
    {
      brand: "Pintoo",
      authors: [
        {
          name: "小油畫",
          image: littleOilArt,
          slug: "little-oil-art",
          artworks: [
            {
              pcs: 500,
              name: "馨月之約",
              image: warmMoon,
              hoverImage: warmMoon2,
              slug: "xinyue-zhi-yue",
            },
            {
              pcs: 600,
              name: "黑貓的聖誕節",
              image: blackCatChristmas,
              hoverImage: blackCatChristmas2,
              slug: "hei-mao-de-sheng-dan-jie",
            },
            {
              pcs: 800,
              name: "與妳的悄悄話",
              image: WhispersWithYou,
              hoverImage: WhispersWithYou2,

              slug: "yu-ni-de-qiao-qiao-hua",
            },
            {
              pcs: 900,
              name: "窗邊的貓",
              image: catByWindow,
              hoverImage: catByWindow2,
              slug: "chuang-bian-de-mao",
            },
          ],
        },
      ],
    },
    {
      brand: "拼圖密室",
      authors: [
        {
          name: "boptop",
          image: boptop,
          slug: "botop",
          artworks: [
            {
              pcs: 1000,
              name: "唐代黑貓",
              image: blackCatOfTangDynasty,
              hoverImage: blackCatOfTangDynasty2,
              slug: "shen-mi-sen-lin",
            },
          ],
        },
      ],
    },
  ]);

  const selectedAuthor = ref<Author | null>(null);

  const filteredArtworks = computed(() => {
    if (selectedAuthor.value) {
      return selectedAuthor.value.artworks;
    }
    return totalPuzzle.value.flatMap((brand) =>
      brand.authors.flatMap((author) => author.artworks)
    );
  });

  function setSelectedAuthor(author: Author | null) {
    selectedAuthor.value = author;
  }

  // 查找特定 slug 的 Artwork
  function findArtworkBySlug(slug: string): Artwork | null {
    let found: Artwork | null = null;

    totalPuzzle.value.some((brand) =>
      brand.authors.some((author) => {
        found = author.artworks.find((a) => a.slug === slug) || null;
        return found !== null; // 找到就停止內層 some
      })
    );

    return found;
  }

  return {
    totalPuzzle,
    selectedAuthor,
    filteredArtworks,
    setSelectedAuthor,
    findArtworkBySlug,
  };
});
