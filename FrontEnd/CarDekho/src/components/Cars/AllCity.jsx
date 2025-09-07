import React from 'react';
import useCityData from '../../hooks/location/useCityData';
import Shimmer from '../shared/Shimmer';
import BrandsCard from './cards/BrandsCard';

const AllCity = () => {
    const { cities, error } = useCityData();
    if (error) {
        toast.error(error.message || "unable to fetch brands!!", { theme: "dark" });
        return;
    }
    console.log(cities);
    return (
        <div>
            <div>
                <div className="bg-gradient-to-br from-black to-pink-950 p-4 mt-2 rounded-2xl text-2xl font-bold text-white ">
                    <h1>Cities We Operate</h1>
                    <div className="grid grid-cols-7 gap-4 w-full justify-center     ">
                        {cities && cities.listings && cities.listings.length > 0 ? (
                            cities.listings.map((c) => (
                                <BrandsCard key={c.CityID} name={c.City} />
                            ))
                        ) : (
                            <Shimmer />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AllCity;
