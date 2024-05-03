import { CarouselMenu } from "@/components/carousels-menu";

import { MainHeader } from "@/components/main-header";

export default async function Home() {
  return (
    <div className="text-white">
      <MainHeader />

      <CarouselMenu />
    </div>
  );
}
