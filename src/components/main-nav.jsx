import { Search } from "lucide-react";

export const MainNav = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 p-10">
      <div className="flex flex-row items-center text-white justify-between">
        <h1 className="font-heading text-2xl">Cinematic</h1>
        <input
          type="text"
          className="rounded-full w-[500px]  bg-black/50 font-sans p-3"
          placeholder="Search for movies/tv shows...."
        />
        <Search />
      </div>
    </div>
  );
};
