import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import p1 from "../../../../assets/mock/colorfull-x-s/mock1.png";
import p2 from "../../../../assets/mock/colorfull-x-s/mock2.png";

const defaultImages = [
  {
    label: "Photo1",
    alt: "Photo1",
    imgPath: p1,
  },
  {
    label: "Photo2",
    alt: "Photo2",
    imgPath: p2,
  },
];

interface ImageCarouselProps {
  imagesArray?: { label: string; alt: string; imgPath: string }[];
}

export const ImageCarousel = ({ imagesArray }: ImageCarouselProps) => {
  const [Swiper, setSwiper] = useState<any>(null);
  const [SwiperSlide, setSwiperSlide] = useState<any>(null);
  const [Pagination, setPagination] = useState<any>(null);
  const images = imagesArray || defaultImages;

  useEffect(() => {
    async function loadSwiperComponents() {
      await import("swiper/swiper-bundle.css");
      await import("swiper/css/pagination");

      const swiperModule = await import("swiper/react");
      const swiperModules = await import("swiper/modules");
      setSwiper(swiperModule.Swiper);
      setSwiperSlide(swiperModule.SwiperSlide);
      setPagination(swiperModules.Pagination);
    }

    loadSwiperComponents();
  }, []);

  if (!Swiper || !SwiperSlide || !Pagination) {
    return <div>Loading...</div>; // Or any other loading state representation
  }

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Swiper
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
      >
        {images.map((image) => (
          <SwiperSlide key={image.label}>
            <Box
              component="img"
              sx={{
                height: 255,
                display: "block",
                maxWidth: 400,
                overflow: "hidden",
                width: "100%",
              }}
              src={image.imgPath}
              alt={image.label}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
