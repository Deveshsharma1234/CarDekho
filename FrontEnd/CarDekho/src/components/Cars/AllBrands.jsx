import React from 'react';
import BrandsCard from './cards/BrandsCard';
import useBrandData from '../../hooks/cars/useBrandData';
import { toast } from 'react-toastify';
import Shimmer from '../shared/Shimmer';
const AllBrands = () => {
    const {brand, error} = useBrandData();
    if(error) {
          toast.error(error.message || "unable to fetch brands!!", { theme: "dark" });
          return;
    }
    console.log(brand);
    
    return (
        <div>
   
      <div className=" bg-gradient-to-br from-black to-pink-950 p-4 mt-2 rounded-2xl text-2xl font-bold text-white">
           <h1>Brands</h1>
       <div className='grid  w-full justify-center grid-cols-7 gap-4 rounded-2xl'>
         {brand.success === true && brand.data.length > 0 ? (
          brand.data.map((b) => (
            <BrandsCard key={b.BrandId} name={b.BrandName} />
          ))
        ) : (
          <Shimmer />
        )}
       </div>
      </div>
    </div>
    );
}

export default AllBrands;
