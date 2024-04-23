import Image from "next/image";

export default async function Page({ params }) {
  async function Info() {
    const res = await fetch(
      `https://api.themoviedb.org/3/${params.media_type}/${params.id}?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  const item = await Info();

  return (
    <div className="text-white relative  ">
      <Image
        className="object-cover w-full h-[540px]"
        width={500}
        height={700}
        unoptimized
        alt="heelo"
        src={`https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${item.backdrop_path}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[999px]" />
      <div className="flex flex-col gap-20 items-center h-fit w-full mx-auto absolute top-0 right-0 left-0 bottom-0 justify-center ">
        <iframe
          src={`https://vidsrc.to/embed/${params.media_type}/${params.id}`}
          frameborder="1"
          allow="autoplay; encrypted-media"
          allowfullscreen
          width={1100}
          height={500}
          title="Video Player"
        ></iframe>
        <div className="flex flex-col w-2/3 text-balance">
          <h1 className={`font-heading   lg:text-4xl text-xl text-left mb-3`}>
            {item.name || item.title}
          </h1>
          <div className="flex flex-row gap-3">
            {item.genres.map((items) => (
              <h3 className="text-white font-sans">{items.name}</h3>
            ))}
          </div>

          {item.tagline && (
            <p className="text-white italic font-sans">{item.tagline}</p>
          )}
          <p className="font-sans text-white/80 truncted  text-lg text-left mb-4">
            {item.overview}
          </p>
        </div>
      </div>{" "}
    </div>
  );
}
