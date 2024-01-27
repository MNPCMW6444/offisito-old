import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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

interface ImageCarouelProps {
  imagesArray?: { label: string; alt: string; imgPath: string }[];
}

export const ImageCarousel = ({ imagesArray }: ImageCarouelProps) => {
  const images = imagesArray || defaultImages;
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
