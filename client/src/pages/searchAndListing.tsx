import { useState } from "react";
import SearchResults from "../components/SearchResults";

const SearchAndListing = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const buttonStyle = {
    background: 'rgb(105,11,62)',
    backgroundImage: 'linear-gradient(90deg, rgba(105,11,62,1) 0%, rgba(95,50,68,1) 11%, rgba(22,72,92,1) 36%, rgba(18,73,93,1) 55%, rgba(245,134,36,1) 80%, rgba(105,11,62,1) 100%)',
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
              placeholder="Search for a location"
              className="form-control"
              style={{ maxWidth: "400px" }}
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