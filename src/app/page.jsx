import { CarouselMenu } from "@/components/carousels-menu";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MainHeader } from "@/components/main-header";
import { PopularMovies } from "@/config/tmdb";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

export default async function Home() {
  const datas = await PopularMovies();
  return (
    <div className="text-white">
      <MainHeader />

      <CarouselMenu />
    </div>
  );
}
