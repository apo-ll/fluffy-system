"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Button } from "./Button";

export function Carousel({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false },
    [Autoplay({ delay: 8000 })],
    [WheelGesturesPlugin()]
  );
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla overflow-hidden lg:h-full h-[300px]" ref={emblaRef}>
      <div
        className="flex flex-row items-center justify-start"
        style={{ height: "100%" }}
      >
        {children}
      </div>
      <div className="lg:flex flex-row gap-3 items-center  absolute bottom-0 right-[100px] hidden">
        <Button onClick={scrollPrev}>❮</Button>
        <Button onClick={scrollNext}>❯</Button>
      </div>
    </div>
  );
}
