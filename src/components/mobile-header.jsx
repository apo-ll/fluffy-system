"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef, useCallback } from "react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Button } from "@/components/Button";

export const runtime = "edge";

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
    <main className="drop-shadow-[0_35px_35px_rgba(255,255,255,0.30)]">
      <section className=" rounded-t-xl mx-auto  lg:hidden block">
        <div className="  ">
          <div className="embla overflow-hidden h-full" ref={emblaRef}>
            <div
              className="flex flex-row items-center mx-auto "
              style={{ height: "100%" }}
            >
              {trending &&
                trending.results.slice(0, 11).map((item) => (
                  <div
                    key={item.id}
                    className="embla__slide h-full flex flex-col items-center mx-auto  l" // Add shadow and shadow-white classes
                    ref={slideRef}
                  >
                    <div className="image-container mb-5">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                        alt={item.title}
                        width={300}
                        height={400}
                        className="object-cover border-2 border-white/50 rounded-lg"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                    <div className=" flex-col flex  gap-2    text-white">
                      <h1 className="font-heading text-2xl mb-1 text-center">{ item.name || item.title}</h1>
                      <p className="text-center text-white-50 mb-2 font-sans">{item.media_type}</p>
                      <div className="flex flex-row gap-3 font-heading font-medium text-sm ">
                        <Button variant="default" className=''>More Info</Button>
                        <Button variant="outline">Watch Trailer</Button>
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

// He;;

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
