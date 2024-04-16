"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { PopularMovies } from "@/config/tmdb";

const CarouselMenu = ({ datas }) => {
  const [emblaRef] = useEmblaCarousel([WheelGesturesPlugin()]);
  const { data } = useQuery({
    queryKey: ["PopularMoviess"],
    queryFn: async () => await PopularMovies(),
  });

  return (
    <div className="embla overflow-hidden h-fit" ref={emblaRef}>
      <div
        className="flex flex-row gap-5 items-start justify-start px-3"
        style={{ height: "100%" }}
      >
        {data &&
          data.results.map((item) => (
            <div className="grow-0 shrink-0 2xl:w-auto lg:w-auto sm:w-5/12 w-5/12 flex flex-col lg:gap-3 py-5">
              <Image
                alt={item.name}
                width={300}
                height={150}
                className="grow-0 shrink-0 rounded-lg hover:outline hover:outline-2 transition-all hover:transition-all hover:ease-in-out hover:duration-300 hover:outline-white "
                src={`https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${item.poster_path}`}
              />
              <h1 className="font-heading w-full  lg:text-lg sm:text-sm text-sm">
                {item.name || item.title}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};
export { CarouselMenu };
