"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { PopularMovies, PopularShows } from "@/config/tmdb";
import Link from "next/link";
import { useCallback } from "react";
import { Button } from "./Button";

const CarouselMenu = ({ datas }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel([WheelGesturesPlugin()]);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const { data: movie } = useQuery({
    queryKey: ["PopularMoviess"],
    queryFn: async () => await PopularMovies(),
  });

  const { data: tv } = useQuery({
    queryKey: ["PopularTv"],
    queryFn: async () => await PopularShows(),
  });
  return (
    <div className="flex flex-col gap-5 px-5 ">
      <div className="embla overflow-hidden h-fit flex flex-col" ref={emblaRef}>
        <h1 className="text-white font-sans text-2xl mb-3 ml-3">
          Popular Movies
        </h1>

        <div
          className="flex flex-row gap-5 items-start justify-start px-3"
          style={{ height: "100%" }}
        >
          {movie &&
            movie.results.map((item) => (
              <Link
                href={`/info/${item.media_type}/${item.id}`}
                className="grow-0 shrink-0 2xl:w-auto lg:w-[250px] sm:w-5/12 w-5/12 flex flex-col lg:gap-3 py-5"
              >
                <Image
                  alt={item.name}
                  width={250}
                  height={150}
                  className="grow-0 shrink-0 rounded-lg hover:outline hover:outline-2 transition-all hover:transition-all hover:ease-in-out hover:duration-300 hover:outline-white "
                  src={`https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${item.poster_path}`}
                />
                <h1 className="font-heading w-full  lg:text-lg sm:text-sm text-sm">
                  {item.name || item.title}
                </h1>
              </Link>
            ))}
        </div>
        <div className="lg:flex flex-row gap-3 items-center  hidden">
          <Button onClick={scrollPrev}>❮</Button>
          <Button onClick={scrollNext}>❯</Button>
        </div>
      </div>

      <div className="embla overflow-hidden h-fit" ref={emblaRef}>
        <h1 className="text-white font-sans text-2xl mb-3 ml-3 ">
          Popular Tv Shows
        </h1>
        <div
          className="flex flex-row gap-5 items-start justify-start px-3"
          style={{ height: "100%" }}
        >
          {tv &&
            tv.results.map((item) => (
              <Link
                href={`/info/${item.media_type}/${item.id}`}
                className="grow-0 shrink-0 2xl:w-auto lg:w-[250px] sm:w-5/12 w-5/12 flex flex-col lg:gap-3 py-5"
              >
                <Image
                  alt={item.name}
                  width={250}
                  height={150}
                  className="grow-0 shrink-0 rounded-lg hover:outline hover:outline-2 transition-all hover:transition-all hover:ease-in-out hover:duration-300 hover:outline-white "
                  src={`https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${item.poster_path}`}
                />
                <h1 className="font-heading w-full  lg:text-lg sm:text-sm text-sm">
                  {item.name || item.title}
                </h1>
              </Link>
            ))}
        </div>
      </div>
      <div className="lg:flex flex-row gap-3 items-center   hidden">
        <Button onClick={scrollPrev}>❮</Button>
        <Button onClick={scrollNext}>❯</Button>
      </div>
    </div>
  );
};
export { CarouselMenu };
