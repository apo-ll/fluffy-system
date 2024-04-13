import Image from "next/image";

import { Button } from "@/components/Button";
import MobileHeader from "@/components/mobile-header";
import { Play } from "lucide-react";
import { MainNav } from "./main-nav";
import { Carousel } from "./carousel";
import { Trending } from "@/config/homepage";

export async function MainHeader() {
  const trending = await Trending();

  return (
    <main className="">
      <MobileHeader trending={trending} />
      <section className="relative w-full  2xl:h-[850px] lg:h-[600px] h-[400px] lg:block hidden">
        <MainNav />
        <div className="w-full  h-full ">
          <Carousel>
            {trending &&
              trending.results.slice(0, 11).map((item) => (
                <div
                  key={item.id}
                  className="embla__slide h-full relative" // Ensure this has a position other than 'static'
                >
                  <Image
                    src={`
                https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${item.details.backdrop_path}`}
                    alt={item.details.name || item.details.title}
                    fill
                    className="object-cover rounded-t-xl"
                    quality={50}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[999px]" />
                  <div className="absolute z-50 flex-col flex bottom-[100px] left-0 gap-3 transform  right-0 p-4 max-w-6xl px-4  ml-7    text-white">
                    <h1 className="font-heading lg:text-5xl text-xl text-left mb-5">
                      {item.details.name || item.details.title}
                    </h1>
                    <p className="font-sans text-white/80  text-xl text-left mb-4">
                      {item.details.tagline}
                    </p>
                    <div className="flex flex-row gap-3 font-heading font-medium text-lg ">
                      <Button
                        variant="default"
                        className="flex flex-row gap-2 items-center"
                      >
                        <Play />
                        <h1>Watch Trailer</h1>
                      </Button>
                      <Button variant="outline">More Info</Button>
                    </div>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </section>
    </main>
  );
}
