import React, { use, useState } from 'react';
import FilterCards from '../cards/FilterCards';
import useFilterData from '../../../hooks/cars/useFilterData';
import Shimmer from '../../shared/Shimmer';
import { removeListingFilter } from '../../../redux/slice/listingFliterSlice';
import { useDispatch } from 'react-redux';

const FilterSection = () => {

    const {filter , error} =    useFilterData();
    const [openFilterId, setOpenFilterId] = useState(null);
    const dispath = useDispatch();

    if(error){
        console.log(error)
        return;
    }
    const toggleFilter = (id) => {
    setOpenFilterId(openFilterId === id ? null : id); 
  };
    console.log(filter)
    return (
        <div className={`w-1/5 h-full mt-7 gap-3 flex flex-col justify-between   `}>  
        <button className='btn-active w-full border rounded-2xl' onClick={()=>{
            dispath(removeListingFilter())
        }}>Clear All filter</button>
            {
               filter && filter.length >0?(filter.map(f=>
                    <FilterCards  key={f.id}
            filter={f}
            isOpen={openFilterId === f.id}
            onToggle={() => toggleFilter(f.id)}/>
                )):(<Shimmer/>)
            }   
               
        </div>
    );
}

export default FilterSection;
