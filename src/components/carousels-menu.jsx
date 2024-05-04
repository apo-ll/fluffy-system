"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { PopularMovies, PopularShows } from "@/config/tmdb";
import Link from "next/link";
import { Icons } from "./icon";
import { Button } from "./Button";
import { useCallback } from "react";

const CarouselMenu = ({ name, data }) => {
  return (
    <div className="flex flex-col px-5 ">
      <CarouselMovie />
      <CarouselTv />
    </div>
  );
};
export { CarouselMenu };

const CarouselMovie = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    WheelGesturesPlugin(),
  ]);

  const { data: movie } = useQuery({
    queryKey: ["PopularMoviess"],
    queryFn: async () => await PopularMovies(),
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <div>
      <h1 className="text-white font-sans text-2xl mb-3 ml-3 ">
        Popular Movies
      </h1>
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          className="flex relative flex-row 2xl:gap-5 lg:gap-1 px-3 gap-2"
          style={{ height: "100%" }}
        >
          <button
            onClick={scrollPrev}
            className="p-2 bg-white/50 hover:bg-white focus:ring focus:ring-1 focus:ring-white focus:ring-offset-2 transition-all duration-300 rounded-full absolute left-0 top-[200px]"
          >
            <Icons.left className="stroke-black" />
          </button>
          <button
            onClick={scrollNext}
            className="right-0 absolute top-[200px] p-2 bg-white/50 hover:bg-white focus:ring focus:ring-1 focus:ring-white focus:ring-offset-2 transition-all duration-300 rounded-full"
          >
            <Icons.right className="stroke-black" />
          </button>
          {movie &&
            movie.results.map((item) => (
              <Link
                key={item.id}
                href={`/info/${item.media_type}/${item.id}`}
                className="grow-0 shrink-0 2xl:w-[250px] lg:w-[250px] h-[490px] sm:w-5/12 w-5/12 flex flex-col py-5 justify-between"
              >
                <div className="flex flex-col grow-0 shrink-0 gap-3">
                  <Image
                    alt={item.name}
                    width={250}
                    height={150}
                    className="grow-0 shrink-0 lg:w-11/12 rounded-lg hover:outline hover:outline-2 transition-all hover:duration-300 hover:outline-white"
                    src={`https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${item.poster_path}`}
                  />

                  <h1 className="font-heading w-full lg:text-lg sm:text-sm text-sm">
                    {item.name || item.title}
                  </h1>
                </div>

                <h2 className="flex flex-row items-center gap-2 font-sans">
                  <Icons.star className="fill-[#F4C418]" />{" "}
                  <div>{item.vote_average.toFixed(1)}</div>
                </h2>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

const CarouselTv = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    WheelGesturesPlugin(),
  ]);
  const { data: tv } = useQuery({
    queryKey: ["PopularTv"],
    queryFn: async () => await PopularShows(),
  });

  return (
    <>
      <h1 className="text-white font-sans text-2xl mb-3 ml-3 ">
        Popular Tv Shows
      </h1>
      <div className="embla overflow-hidden h-fit" ref={emblaRef}>
        <div
          className="flex flex-row 2xl:gap-5 lg:gap-1 px-3  gap-2"
          style={{ height: "100%" }}
        >
          {tv &&
            tv.results.map((item) => (
              <Link
                key={item.id}
                href={`/info/${item.media_type}/${item.id}`}
                className="grow-0  shrink-0 2xl:w-[250px] lg:w-[250px]  sm:w-5/12 w-5/12 flex flex-col lg:gap-3 py-5"
              >
                <Image
                  alt={item.name}
                  width={250}
                  height={150}
                  className="grow-0 shrink-0 lg:w-11/12 rounded-lg hover:outline hover:outline-2 hover:outline-offset-2 transition-all hover:transition-all hover:ease-in-out hover:duration-300 hover:outline-white "
                  src={`https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${item.poster_path}`}
                />
                <h1 className="font-heading w-full  lg:text-lg sm:text-sm text-sm">
                  {item.name || item.title}
                </h1>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};
