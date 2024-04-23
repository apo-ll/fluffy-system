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

export async function PopularMovies() {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1",
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
        `https://api.themoviedb.org/3/movie/${itemId}?language=en-US`,
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


export async function PopularShows() {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/tv/week?language=en-US&page=1",
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
        `https://api.themoviedb.org/3/tv/${itemId}?language=en-US`,
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