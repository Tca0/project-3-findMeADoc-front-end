import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SearchBar({ placeholder, doctorData, specialtyData }) {
  const [filteredDoctorData, setFilteredDoctorData] = useState([]);
  const [filteredSpecialtyData, setFilteredSpecialtyData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    setWordEntered(event.target.value);
    const doctorSearchWord = event.target.value.toLowerCase();
    const doctorFilter = doctorData.filter((doctor) => {
      return doctor.fullName.toLowerCase().includes(doctorSearchWord);
    });
    const specialtySearchWord = event.target.value.toLowerCase();
    const specialtyFilter = specialtyData[0].specialties.filter((specialty) => {
      return specialty.toLowerCase().includes(specialtySearchWord);
    });

    if (doctorSearchWord === "" || specialtySearchWord === "") {
      setFilteredDoctorData([]);
      setFilteredSpecialtyData([]);
    } else {
      setFilteredDoctorData(doctorFilter);
      setFilteredSpecialtyData(specialtyFilter);
    }
  };

  const clearInput = () => {
    setFilteredDoctorData([]);
    setFilteredSpecialtyData([]);
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
          {filteredDoctorData.length === 0 &&
          filteredSpecialtyData.length === 0 ? (
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
      {filteredDoctorData.length !== 0 && (
        <div className="dataResult">
          <h3>Doctors</h3>
          {filteredDoctorData.map((doctor, i) => {
            return (
              <Link key={i} to={`/doctors/${doctor._id}`}>
                <div>
                  <div className="dataItem">
                    <p>{doctor.fullName}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {filteredSpecialtyData.length !== 0 && (
        <div className="dataResult">
          <h3>Specialities</h3>
          {filteredSpecialtyData.map((filteredSpecialtyData, i) => {
            return (
              <Link key={i} to={`/doctors`}>
                <div className="dataItem">
                  <p>{filteredSpecialtyData}</p>
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
