import Image from "next/image";

import { Button } from "@/components/Button";
import MobileHeader from "@/components/mobile-header";
import { Play } from "lucide-react";
import { MainNav } from "./main-nav";
import { Carousel } from "./carousel";
import { Trending } from "@/config/tmdb";
import Link from "next/link";

export async function MainHeader() {
  const trending = await Trending();

  return (
    <main>
      <MobileHeader trending={trending} />
      <section className="relative w-full  2xl:h-[850px] lg:h-screen h-[400px] lg:block hidden">
        <MainNav />
        <div className="w-full  h-full ">
          <Carousel>
            {trending &&
              trending.results.map((item) => (
                <div
                  key={item.id}
                  className="embla__slide h-full relative" // Ensure this has a position other than 'static'
                >
                  <Image
                    src={`
                https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${item.details.backdrop_path}`}
                    alt={item.details.name || item.details.title}
                    width={500}
                    height={500}
                    className="object-cover w-screen h-full rounded-t-xl"
                    quality={50}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[999px]" />
                  <div className="absolute z-50 flex-col flex  bottom-[100px] left-0 gap-3 transform  right-0 p-4 max-w-6xl px-4  ml-7    text-white">
                    <h1
                      className={`font-heading   lg:text-5xl text-xl text-left mb-1`}
                    >
                      {item.details.name || item.details.title}
                    </h1>
                    <div className="flex flex-row items-center gap-3 mb-4">
                      {item.details.genres.map((items) => (
                        <h3 className="text-white font-sans">{items.name}</h3>
                      ))}{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-dot"
                      >
                        <circle cx="12.1" cy="12.1" r="1" />
                      </svg>
                      <h1 className="font-sans uppercase text-xs">
                        {item.media_type}
                      </h1>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-dot"
                      >
                        <circle cx="12.1" cy="12.1" r="1" />
                      </svg>
                      <h2 className=" border border-1 rounded-lg text-xs px-2 py-1 font-sans flex items-center border-white">
                        PG-13
                      </h2>
                    </div>
                    <p className="font-sans text-white/80 text-ellipsis truncate  text-xl text-left mb-2">
                      {item.details.overview}
                    </p>
                    <div className="flex flex-row gap-3 font-heading font-medium text-lg ">
                      <Link href={`/info/${item.media_type}/${item.id}`}>
                        <Button
                          variant="default"
                          className="flex flex-row gap-2 items-center font-medium"
                        >
                          <Play />
                          <h1>Watch Now</h1>
                        </Button>
                      </Link>
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
