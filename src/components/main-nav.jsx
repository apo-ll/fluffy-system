import { Search } from "lucide-react";
import Link from "next/link";

export const MainNav = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 lg:p-10 px-5 py-10">
      <div className="flex flex-row items-center text-white justify-between">
        <Link
          href="/"
          className="font-heading text-2xl flex flex-row gap-2 items-center"
        >
          Cinematic
          <span className="bg-white px-2 text-black rounded-lg">One</span>
        </Link>
        <Link
          href="/Search"
          className="p-2 rounded-full hover:bg-gray-50/50 transition-all duration-300 ease-in-out"
        >
          <Search />
        </Link>
      </div>
    </div>
  );
};
