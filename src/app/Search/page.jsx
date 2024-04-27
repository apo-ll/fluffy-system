"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import Link from "next/link";

const fetchSearchResults = async (query) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => fetchSearchResults(searchQuery),

    enabled: searchQuery !== "", // Only fetch data when searchQuery is not empty
  });

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let searchResults = [];
  if (!isLoading && !isError && data) {
    // Process fetched data
    searchResults = data.results;
  }

  // Set up Fuse.js options
  const fuseOptions = {
    keys: ["title", "name"], // Specify which fields to search in
    threshold: 0.3, // Set a threshold for search result relevance
  };

  // Initialize Fuse with searchResults and fuseOptions
  const fuse = new Fuse(searchResults, fuseOptions);

  const handleSearch = (searchQuery) => {
    if (!searchQuery) return [];
    return fuse.search(searchQuery);
  };

  const searchResultsFiltered = handleSearch(searchQuery);

  return (
    <div className="flex flex-col gap-10 mx-auto w-[900px] font-sans">
      <label
        for="input-group-1"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your Email
      </label>
      <div class="relative mb-6 w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <Search className="stroke-white" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          class="bg-gray-950 border border-gray-300 h-[70px] text-xl text-white rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      {isLoading && (
        <div className="w-screen h-screen mx-auto flex justify-center items-center">
          <TailSpin
            visible={true}
            height="100"
            width="100"
            color="#ffffff"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      )}
      {isError && <p>Error fetching data</p>}
      <div className="grid grid-cols-4 gap-4">
        {searchResultsFiltered.map((result, index) => (
          <Link
            href={`/info/${result.item.media_type}/${result.item.id}`}
            key={index}
          >
            <Image
              alt={result.item.name}
              width={250}
              height={150}
              unoptimized
              className="grow-0 shrink-0 lg:w-11/12 rounded-lg hover:outline hover:outline-2 transition-all hover:transition-all hover:ease-in-out hover:duration-300 hover:outline-white "
              src={`https://res.cloudinary.com/drshb6sh5/image/fetch/f_auto,q_auto/https://image.tmdb.org/t/p/original${result.item.poster_path}`}
            />
            <h1 className="text-white">
              {result.item.name || result.item.title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
