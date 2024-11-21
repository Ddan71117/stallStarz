import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListingContainer from "../components/listingContainer";

function SearchAndListing() {
  const filter = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-filter-circle-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M3.5 5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1M5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
    </svg>
  );

  const filterAsc = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-sort-up"
      viewBox="0 0 16 16"
    >
      <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
    </svg>
  );
  const filterDesc = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-sort-down"
      viewBox="0 0 16 16"
    >
      <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
    </svg>
  );

  const [filterToggle, setFilterToggle] = useState<boolean>(false);

  const toggleFilter = () => setFilterToggle((prev: boolean) => !prev);

  const [selectFilter, setSelectFilter] = useState<string | null>(null);

  const handleFilterSelect = (filter: string) => setSelectFilter(filter);

  return (
    <>
      <div>
        <form className="mt-5">
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              className="me-auto"
              placeholder="Enter your location to find public restrooms in your viscinity..."
              style={{ border: "1px solid #444" }}
            />
            <Button variant="primary">Search</Button>
            <div className="vr" />
            <DropdownButton id="dropdown-item-button" title={filter}>
              <Dropdown.Item onClick={toggleFilter}>
                {filterToggle ? (
                  <>Sort by {filterAsc}</>
                ) : (
                  <>Sort by {filterDesc}</>
                )}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                eventKey="1"
                className={selectFilter === "1" ? "active" : ""}
                onClick={() => handleFilterSelect("1")}
              >
                Distance
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                className={selectFilter === "2" ? "active" : ""}
                onClick={() => handleFilterSelect("2")}
              >
                Rating
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="3"
                className={selectFilter === "3" ? "active" : ""}
                onClick={() => handleFilterSelect("3")}
              >
                Number of Ratings
              </Dropdown.Item>
            </DropdownButton>
          </Stack>
        </form>
      </div>
      <div>
        <ListingContainer />
      </div>
    </>
  );
}

export default SearchAndListing;
