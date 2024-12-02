//Test change for git

import { useState } from "react";
import SearchResults from "../components/SearchResults";

const SearchAndListing = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const buttonStyle = {
    background: '#1f2020',
    border: 'none',
    color: 'white',
    transition: 'opacity 0.3s ease'
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const queryInput = form["search"] as HTMLInputElement;
    setSearchQuery(queryInput.value);
  };

  return (
    <div className="bg-white">
      <div className="p-3">
        <form onSubmit={handleSearchSubmit}>
          <div className="d-flex justify-content-center gap-2">
            <input
              type="text"
              name="search"
              placeholder="Search for a nearby restroom using street name and city."
              className="form-control"
              style={{ maxWidth: "450px" }}
            />
            <button 
              type="submit" 
              className="btn"
              style={buttonStyle}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <SearchResults query={searchQuery} />
    </div>
  );
};

export default SearchAndListing;