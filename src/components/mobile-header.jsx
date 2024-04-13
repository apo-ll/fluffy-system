import Image from "next/image";
import { Button } from "@/components/Button";
import { Play } from "lucide-react";
import { Carousel } from "./carousel";

export default function MobileHeader({ trending }) {
  return (
    <main className="lg:hidden md:hidden block">
      <Carousel>
        {trending &&
          trending.results.slice(0, 11).map((item) => (
            <div
              key={item.id}
              className="embla__slide h-full flex flex-col relative  "
            >
              <div className="image-container mb-5">
                <Image
                  src={`
                 https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${item.details.backdrop_path}`}
                  alt={item.details.title}
                  fill
                  className="object-cover  rounded-t-2xl"
                  unoptimized
                  quality={50}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[999px]" />
              <div className="absolute bottom-[50px] left-0 z-50 right-0 ml-5 transform  flex-col flex items-left text-left  text-white">
                <h1 className="font-heading text-2xl mb-1 ">
                  {item.details.name || item.details.title}
                </h1>
                <p className="text-white/80 font-sans mb-3">
                  {item.details.tagline}
                </p>
                <div className="flex flex-row gap-x-3 font-heading font-medium text-sm items-center ">
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
    </main>
  );
}
