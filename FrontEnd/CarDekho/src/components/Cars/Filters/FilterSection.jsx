import React from 'react';
import FilterCards from '../cards/FilterCards';
import useFilterData from '../../../hooks/cars/useFilterData';
import Shimmer from '../../shared/Shimmer';

const FilterSection = () => {

    const {filter , error} =    useFilterData();
    if(error){
        console.log(error)
        return;
    }
    console.log(filter)
    return (
        <div className={`w-1/5 h-full  gap-3 flex flex-col justify-between   `}>  
            {
                filter && filter.data && filter.data.length>0?(filter.data.map(f=>
                    <FilterCards key={f.id} filter={f.filter_key}/>
                )):(<Shimmer/>)
            }   
               
        </div>
    );
}

export default FilterSection;
