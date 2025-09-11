import React from 'react';
import { PiPlus } from 'react-icons/pi';
import getBgClass, { getGradianShiftClass } from '../../../utils/css/getBackground';
import { useLocation } from 'react-router';

const FilterCards = ({filter}) => {
    const location = useLocation();
    return (
      <div className={`flex items-center justify-between border rounded-xl p-2 text-2xl ${getBgClass(location.pathname)}`}>
  <h1>{filter}</h1>
  <PiPlus />
</div>

    );
}

export default FilterCards;
