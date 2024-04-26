"use client";

import Image from "next/image";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useQuery } from "@tanstack/react-query";
import { Trailer } from "@/components/Trailer";
import { useState } from "react";

export default function Page({ params }) {
  const { data: item } = useQuery({
    queryKey: ["iNFO"],
    queryFn: async function Info() {
      const res = await fetch(
        `https://api.themoviedb.org/3/${params.media_type}/${params.id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        }
      );

      return res.json();
    },
  });

  const { data: trailers } = useQuery({
    queryKey: ["Trailer"],
    queryFn: async function trailers() {
      const res = await fetch(
        `https://api.kinocheck.de/${
          params.media_type === "movie" ? "movies" : "shows"
        }?tmdb_id=${params.id}&language=en&categories=Trailer`
      );
      return res.json();
    },
  });

  return (
    <div className="text-white relative  ">
      <Image
        className="object-cover w-full h-[540px]"
        width={500}
        height={700}
        unoptimized
        alt="heelo"
        src={`https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${
          item && item.backdrop_path
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[999px]" />
      <div className="flex flex-col gap-20 items-center h-fit w-full mx-auto absolute top-0 right-0 left-0 bottom-0 justify-center ">
        <TrailerMedia media_type={params.media_type} id={params.id} />
        <div className="flex flex-col text-balance">
          <h1 className={`font-heading   lg:text-4xl text-xl text-left mb-3`}>
            {(item && item.name) || (item && item.title)}
          </h1>
          <div className="flex flex-row gap-3">
            {item &&
              item.genres.map((items) => (
                <h3 key={item.id} className="text-white font-sans">
                  {items.name}
                </h3>
              ))}
          </div>

          {item && item.tagline && (
            <p className="text-white italic font-sans">{item.tagline}</p>
          )}
          <p className="font-sans text-white/80 truncted  text-lg text-left mb-4">
            {item && item.overview}
          </p>
        </div>
      </div>{" "}
    </div>
  );
}

const TrailerMedia = async ({ media_type, id, title }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    }
  );
  const data = await response.json();

  return (
    <div className="w-[720px] h-[405px] ">
      {data && data.results.length > 0 && (
        <Trailer
          id={data && data.results.find((item) => item.type === "Trailer").key}
          title={data.results.find((item) => item.type === "Trailer").name}
          width={900}
        />
      )}
    </div>
  );
};
