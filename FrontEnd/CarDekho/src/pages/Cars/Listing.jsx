import React from 'react';
import FilterSection from '../../components/Cars/Filters/FilterSection';
import ListingSection from '../../components/Cars/Filters/ListingSection';
import { useLocation, useParams } from 'react-router';

const Listing = () => {
    const { BrandId, CityId } = useParams();
  const location = useLocation();


  const filters = {};

  if (BrandId) filters.brand = BrandId;
  if (CityId) filters.city = CityId
  const searchParams = new URLSearchParams(location.search);
  if (searchParams.get("minPrice")) filters.minPrice = searchParams.get("minPrice");
  if (searchParams.get("maxPrice")) filters.maxPrice = searchParams.get("maxPrice");
    return (
        <div className='flex justify-around '>           
            <FilterSection/>
            <ListingSection filters={filters} />
        </div>
    );
}

export default Listing;
