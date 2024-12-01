import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import HospitalList from "./HospitalList";

const HospitalDataFilterer = () => {
  const [city, setCity] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [doctorTypes, setDoctorTypes] = useState("");

  const [originalData, setOriginalData] = useState([]); // Unfiltered data from the API
  const [filteredData, setFilteredData] = useState([]); // Data after applying filters

  const [cityList, setCityList] = useState([]);
  const [specialityData, setSpecialityData] = useState([]);
  const [hospitalNames, setHospitalNames] = useState([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await fetch("http://localhost:3500/hospitalsApi/hospitals");
        if (response.ok) {
          const data = await response.json();
          setOriginalData(data);
          setFilteredData(data);

          // Populate initial dropdown data
          setCityList([...new Set(data.map((hospital) => hospital.location))].sort());
          setSpecialityData(
            [...new Set(data.flatMap((hospital) => hospital.doctor_types))].sort()
          );
          setHospitalNames([...new Set(data.map((hospital) => hospital.hospital_name))].sort());
        } else {
          console.error("Failed to fetch dropdown data");
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    // Dynamically filter the data based on applied filters
    const updatedFilteredData = originalData.filter((hospital) => {
      const cityMatches = city ? hospital.location === city : true;
      const nameMatches = hospitalName
        ? hospital.hospital_name === hospitalName
        : true;
      const doctorTypeMatches = doctorTypes
        ? hospital.doctor_types.includes(doctorTypes)
        : true;

      return cityMatches && nameMatches && doctorTypeMatches;
    });

    setFilteredData(updatedFilteredData);

    // Update dropdown options based on the filtered data
    setCityList([...new Set(updatedFilteredData.map((hospital) => hospital.location))].sort());
    setSpecialityData(
      [...new Set(updatedFilteredData.flatMap((hospital) => hospital.doctor_types))].sort()
    );
    setHospitalNames(
      [...new Set(updatedFilteredData.map((hospital) => hospital.hospital_name))].sort()
    );
  }, [city, hospitalName, doctorTypes, originalData]);

  return (
    <>
      <FilterBar
        city={city}
        hospitalName={hospitalName}
        doctorTypes={doctorTypes}
        setCity={setCity}
        setHospitalName={setHospitalName}
        setDoctorTypes={setDoctorTypes}
        cityList={cityList}
        specialityData={specialityData}
        hospitalData={hospitalNames}
      />
      <HospitalList
        city={city}
        hospitalName={hospitalName}
        doctorTypes={doctorTypes}
        hospitalData={filteredData}
      />
    </>
  );
};

export default HospitalDataFilterer;
