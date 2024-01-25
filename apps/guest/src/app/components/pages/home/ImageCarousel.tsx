import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Box } from "@mui/material";

const images = [
  {
    label: "Photo1",
    alt: "Photo1",
    imgPath: "",
  },
  {
    label: "Photo2",
    alt: "Photo2",
    imgPath: "",
  },
  {
    label: "Photo3",
    alt: "Photo3",
    imgPath: "",
  },
  {
    label: "Photo4",
    alt: "Photo4",
    imgPath: "",
  },
  {
    label: "Photo5",
    alt: "Photo5",
    imgPath: "",
  },
  {
    label: "Photo6",
    alt: "Photo6",
    imgPath: "",
  },
];
const ImageCarousel = () => {
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

export default ImageCarousel;
