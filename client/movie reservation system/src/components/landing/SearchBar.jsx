import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="flex h-14 w-full max-w-2xl items-center rounded-full border border-[#2B2638] bg-[#14111C] px-6 shadow-lg">

        <Search
          size={20}
          className="text-gray-400"
        />

        <input
          type="text"
          placeholder="Search movies..."
          className="ml-4 w-full bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
        />

      </div>
    </div>
  );
}

export default SearchBar;