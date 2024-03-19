export async function Trending() {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    }
  );

  const data = await res.json();

  const trendingWithDetails = await Promise.all(
    data.results.map(async (item) => {
      const mediaType = item.media_type;
      const itemId = item.id;

      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${itemId}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        }
      );

      const details = await detailsRes.json();

      return { ...item, details };
    })
  );

  return { ...data, results: trendingWithDetails };
}
