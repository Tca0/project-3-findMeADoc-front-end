import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  console.log(data);
  const handleFilter = (event) => {
    setWordEntered(event.target.value);
    const searchWord = event.target.value.toLowerCase();
    const newFilter = data.filter((value) => {
      return (
        value.fullName.toLowerCase().includes(searchWord) ||
        value.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchWord)
        )
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          ) : (
            <FontAwesomeIcon
              id="clearBtn"
              onClick={clearInput}
              icon={faClose}
            />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value) => {
            return (
              <Link key={value.fullName} to="/doctors">
                <div>
                  <ul className="dataItem">
                    <li>{value.fullName}</li>
                  </ul>
                  {/* {value.specialties.length && (
                    <ul className="dataItem">
                      {value.specialties.map((specialty) => (
                        <li key={specialty.id}>{specialty.name}</li>
                      ))}
                    </ul>
                  )} */}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
