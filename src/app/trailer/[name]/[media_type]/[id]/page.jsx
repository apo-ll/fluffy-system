import { useQuery } from "@tanstack/react-query";
import { Trailer } from "@/components/Trailer";

export default async function TrailerPage({ params }) {
  return (
    <div className="flex mx-auto justify-center items-center rounded-lg">
      <TrailerInfo media_type={params.media_type} id={params.id} />
    </div>
  );
}

const TrailerInfo = async ({ media_type, id }) => {
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
    <div>
      {data && data.results.length > 0 && <Trailer id={data.results[0].key} />}
    </div>
  );
};
