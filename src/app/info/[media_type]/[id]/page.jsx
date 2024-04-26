import Image from "next/image";
import { Trailer } from "@/components/Trailer";

export default async function Page({ params }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${params.media_type}/${params.id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    }
  );

  const item = await res.json();

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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[999px] " />
      <div className="   absolute  top-0 right-0 left-0 bottom-0 flex mx-auto mt-40">
        <div className="flex flex-col gap-20 mx-auto justify-center   h-auto min-w-[700px]">
          <TrailerMedia media_type={params.media_type} id={params.id} />
          <div className="flex flex-col text-balance w-[700px]">
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
    </div>
  );
}

const TrailerMedia = async ({ media_type, id }) => {
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
          title={
            data && data.results.find((item) => item.type === "Trailer").name
          }
          params="autoplay=1&controls=1"
        />
      )}
    </div>
  );
};
