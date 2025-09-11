import React from "react";
import useCityData from "../../hooks/location/useCityData";
import Shimmer from "../shared/Shimmer";
import BrandsCard from "./cards/BrandsCard";
import { toast } from "react-toastify";
import { Link } from "react-router";

const AllCity = () => {
  const { cities, error } = useCityData();

  if (error) {
    toast.error(error.message || "Unable to fetch cities!!", { theme: "dark" });
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-black to-pink-950 p-6 mt-6 rounded-2xl text-white">
      <h1 className="mb-6 text-center text-3xl font-bold">Cities We Operate</h1>

      <div className="grid grid-cols-5 gap-4 w-full">
        {cities && cities.listings && cities.listings.length > 0 ? (
          cities.listings.map((c) => (
            <Link key={c.CityID} to={`cars-by-city/${c.CityID}`}>
            <BrandsCard key={c.CityID} name={c.City} /></Link>
          ))
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
};

export default AllCity;
