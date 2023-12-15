"use client";

import React, { useEffect } from "react";
import { useSearch } from "../../context/search";
import { useSearchParams } from "next/navigation";
import BlogList from "../../components/blogs/BlogList";

function Search() {
  const { setSearchQuery, searchResults, setSearchResults } = useSearch();
  const searchParams = useSearchParams();
  const query = searchParams.get("searchQuery");

  useEffect(() => {}, [query]);

  const fetchResultsOnLoad = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/search?searchQuery${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead">Search Results {searchResults.length}</p>
          {searchResults ? <BlogList blogs={searchResults} /> : ""}
        </div>
      </div>
    </div>
  );
}

export default Search;
