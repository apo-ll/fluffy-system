"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef, useCallback } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Button } from "@/components/Button";
import { Play } from 'lucide-react';


export default function MobileHeader() {
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
    <main className="lg:hidden md:hidden block">
      <section className="relative rounded-t-3xl mx-auto  ">
        <div className="  ">
          <div className="embla overflow-hidden h-[300px]" ref={emblaRef}>
            <div className="flex flex-row  " style={{ height: "100%" }}>
              {trending &&
                trending.results.slice(0, 11).map((item) => (
                  <div
                    key={item.id}
                    className="embla__slide h-full flex flex-col relative  "
                    ref={slideRef}
                  >
                    <div className="image-container mb-5">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${item.details.backdrop_path}`}
                        alt={item.details.title}
                        fill
                        className="object-cover  rounded-t-2xl"
                        loading="eager"
                        quality={50}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[999px]" />
                    <div className="absolute bottom-[50px] left-0 z-50 right-0 ml-5 transform  flex-col flex items-left text-left  text-white">
                      <h1 className="font-heading text-2xl mb-1 ">
                        {item.details.name || item.details.title}
                      </h1>
                      <p className="text-white/80 font-sans mb-3">{item.details.tagline}</p>
                      <div className="flex flex-row gap-x-3 font-heading font-medium text-sm items-center ">
                        <Button variant="default" className="flex flex-row gap-2 items-center">
                        <Play  />
                          <h1>Watch Trailer</h1>
                        </Button>
                        <Button variant="outline">More Info</Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
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
  const data = await res.json();

  // Map over the results and fetch additional details
  const trendingWithDetails = await Promise.all(
    data.results.map(async (item) => {
      const mediaType = item.media_type;
      const itemId = item.id;

      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${itemId}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        }
      );

      const details = await detailsRes.json();

      return { ...item, details };
    })
  );

  return { ...data, results: trendingWithDetails };
}

