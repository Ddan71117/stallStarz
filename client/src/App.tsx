import { useEffect } from "react";
import SearchAndListing from "./pages/searchAndListing";

function App() {
  useEffect(() => {
    fetch("/api")
      .then((response) => response.text())
      .then((data) => {
        console.log("API response:", data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="container">
      <SearchAndListing />
    </div>
  );
}

export default App;
