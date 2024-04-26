import { CarouselMenu } from "@/components/carousels-menu";


import { MainHeader } from "@/components/main-header";
import { PopularMovies } from "@/config/tmdb";

import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

export default async function Home() {
  const datas = await PopularMovies();
  return (
    <div className="text-white">
      <MainHeader />
      
      <CarouselMenu />
    </div>
  );
}
