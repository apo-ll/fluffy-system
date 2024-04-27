import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";

const BASE_URL = "https://api.themoviedb.org/3";

const fetchSearch = async (query) => {
  const res = await fetch(`${BASE_URL}/search/multi`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    },
    params: {
      query,
      include_adult: true,
      language: "en-US",
      page: 1,
    },
  });

  return res.json();
};

export const useSearch = (query) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchSearch(query),
  });

  const fuseSearch = (data, query) => {
    const options = {
      keys: ["title", "name", "overview"],
      includeMatches: true,
      isCaseSensitive: false,
    };

    const fuse = new Fuse(data, options);
    return query ? fuse.search(query).map((result) => result.item) : data;
  };

  const results = data ? fuseSearch(data, query) : [];

  return { results, isLoading, error };
};
