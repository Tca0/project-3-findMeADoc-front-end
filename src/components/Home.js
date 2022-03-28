import SearchBar from "./search/SearchBar";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

const Home = () => {
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    console.log("Running useEffect");
    const getData = async () => {
      const res = await axios.get("https://findmeadoc.herokuapp.com/doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctorData(res.data);
    };
    getData();
  }, []);

  console.log(doctorData);

  return (
    <>
      <h1 onClick={() => setDoctorData("New data")}>
        Welcome to the doctors database
      </h1>
      <div>
        <SearchBar placeholder="Doctor name" data={doctorData} />
      </div>
    </>
  );
};

export default Home;
