import { CloseModal } from "@/components/CloseModal";
import { Trailer } from "@/components/Trailer";

export default async function TrailerModal({ params }) {
  return (
    <div className="fixed inset-0 bg-black/30 opacity-50 blur-2xl z-10">
      <div className="flex items-center h-full max-w-3xl mx-auto">
        <div className="relative bg-black w-full  rounded-lg">
          <CloseModal />
          <TrailerInfo media_type={params.media_type} id={params.id} />
        </div>
      </div>
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
