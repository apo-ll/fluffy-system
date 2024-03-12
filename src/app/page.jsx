"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef, useCallback } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Button } from "@/components/Button";

export const runtime = 'edge'

export default function Home() {
  const { data: trending } = useQuery({
    queryKey: ["Trending"],
    queryFn: async () => await Trending(),
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false },
    [Autoplay({ delay: 10000 })],
    [WheelGesturesPlugin()]
  );
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const slideRef = useRef(null);

  return (
    <main className="">
      <section className="relative lg:h-[800px] h-[400px] ">
        <div className="w-screen absolute lg:h-[800px] h-[400px]">
          <div className="embla overflow-hidden h-full" ref={emblaRef}>
            <div
              className="flex flex-row items-center justify-start"
              style={{ height: "100%" }}
            >
              {trending &&
                trending.results.slice(0, 11).map((item) => (
                  <div
                    key={item.id}
                    className="embla__slide h-full relative" // Ensure this has a position other than 'static'
                    ref={slideRef}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[999px]" />
                    <div className="absolute z-50 flex-col flex bottom-[100px] left-0 gap-3 transform  right-0 p-4 max-w-6xl px-4  ml-7    text-white">
                      <h1 className="font-heading lg:text-5xl text-xl text-left mb-5">
                        {item.original_title ||
                          item.title ||
                          item.original_name ||
                          item.name}
                      </h1>
                      <p className="font-sans truncate ...  text-xl text-left mb-4">
                        {item.overview}...
                      </p>
                      <div className="flex flex-row gap-3 font-heading font-medium ">
                        <Button variant="default">More Info</Button>
                        <Button variant="outline">Watch Trailer</Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3 items-center  absolute bottom-0 right-[100px]">
          <Button onClick={scrollPrev}>❮</Button>
          <Button onClick={scrollNext}>❯</Button>
        </div>
      </section>
    </main>
  );
}

async function Trending() {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    }
  );
  return res.json();
}
