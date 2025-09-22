import { BASE_URL } from "../../utils/constants";

const ImageSlider = ({ images }) => {
  console.log("Images from ImageSlider:", images);

  return (
    <div className="carousel w-full h-80 md:h-96 bg-base-200 rounded-t-xl overflow-hidden">
      {images?.map((img, index) => (
        <div
          key={index}
          id={`slide${index + 1}`}
          className="carousel-item relative w-full"
        >
          <img
            src={`${BASE_URL}${img}`}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              href={`#slide${index === 0 ? images.length : index}`}
              className="btn btn-circle btn-sm"
            >
              ❮
            </a>
            <a
              href={`#slide${index + 2 > images.length ? 1 : index + 2}`}
              className="btn btn-circle btn-sm"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
