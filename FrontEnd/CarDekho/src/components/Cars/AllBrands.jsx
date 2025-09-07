import React from 'react';
import BrandsCard from './cards/BrandsCard';
import useBrandData from '../../hooks/cars/useBrandData';
import { toast } from 'react-toastify';
import Shimmer from '../shared/Shimmer';

const AllBrands = () => {
  const { brand, error } = useBrandData();
  if (error) {
    toast.error(error.message || "Unable to fetch brands!!", { theme: "dark" });
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-black to-pink-950 p-6 mt-6 rounded-2xl text-white ">
      <h1 className="mb-6 text-center text-3xl font-bold">Brands</h1>
      
      <div className="grid grid-cols-7 gap-4 justify-evenly">
        {brand.success === true && brand.data.length > 0 ? (
          brand.data.map((b) => (
            <BrandsCard key={b.BrandId} name={b.BrandName} />
          ))
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
};

export default AllBrands;
