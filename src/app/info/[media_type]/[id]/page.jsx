import Image from "next/image";
import { Trailer } from "@/components/Trailer";
import { Disqus } from "@/components/disqus";

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
        className="object-cover w-screen h-[540px]"
        width={500}
        height={700}
        unoptimized
        alt="heelo"
        src={`https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${
          item && item.backdrop_path
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[999px] " />
      <div className="   absolute  top-0 right-0 left-0 flex mt-28 lg:mx-10">
        <div className="flex flex-col gap-20 px-3    h-auto lg:min-w-[1280px]">
          <TrailerMedia media_type={params.media_type} id={params.id} />
          <div className="flex flex-col lg:max-w-[1280px]">
            <h1 className={`font-heading   lg:text-4xl text-xl text-left mb-3`}>
              {(item && item.name) || (item && item.title)}
            </h1>

            <p className="font-sans text-white/80 truncted  lg:text-lg text-sm text-left mb-4">
              {item && item.overview}
            </p>
          </div>
          <div>
            <Disqus id={params.id} title={item.title} />
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
    <div className="lg:w-[1280px] lg:min-h-[720px] w-[400px] h-[150px] rounded-lg">
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
