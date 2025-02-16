import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MouseEvent, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { callAPI } from "../utils/callApi";

interface Suggestion {
  id: number;
  title: string;
}

const Search = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const navigate = useNavigate();

  const onHandleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate({
      pathname: "search",
      search: createSearchParams({
        category: category,
        searchTerm: searchTerm,
      }).toString(),
    });

    setSearchTerm("");
    setCategory("All");
  };

  const getSuggestions = async () => {
    const suggestionResults = await callAPI<Suggestion[]>(
      `data/suggestions.json`
    );
    setSuggestions(suggestionResults);

    return suggestionResults;
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  return (
    <div className="w-[100%]">
      <div className="flex items-center h-10 bg-amazonclone-yellow rounded">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 bg-gray-300 text-black border text-xs xl:text-sm"
        >
          <option>All</option>
          <option>Deals</option>
          <option>Amazon</option>
          <option>Fashion</option>
          <option>Computers</option>
          <option>Home</option>
          <option>Mobiles</option>
        </select>
        <input
          className="flex grow items-center h-[100%] rounded-l text-black"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={onHandleSubmit} className="w-[45px]">
          <MagnifyingGlassIcon className="h-[27px] m-auto stroke-slate-900" />
        </button>
      </div>
      {suggestions && (
        <div className="bg-white text-black w-full z-40 absolute">
          {suggestions
            .filter((suggestion) => {
              const currentSearchTerm = searchTerm.toLowerCase();
              const title = suggestion.title.toLowerCase();
              return (
                currentSearchTerm &&
                title.startsWith(currentSearchTerm) &&
                title !== currentSearchTerm
              );
            })
            .slice(0, 10)
            .map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => setSearchTerm(suggestion.title)}
              >
                {suggestion.title}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
