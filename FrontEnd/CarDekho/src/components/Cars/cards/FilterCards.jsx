import React from 'react';
import { PiMinus, PiPlus } from 'react-icons/pi';
import getBgClass, { getGradianShiftClass } from '../../../utils/css/getBackground';
import { useLocation } from 'react-router';

const FilterCards = ({filter, isOpen, onToggle}) => {
    const location = useLocation();
     return (
    <div
      className={`flex flex-col border rounded-xl p-3 text-base gap-2 ${getBgClass(
        location.pathname
      )}`}
    >
      <div
        className="flex items-center justify-between text-lg font-semibold cursor-pointer"
        onClick={onToggle}
      >
        <h1>{filter.filter_name}</h1>
        {isOpen ? <PiMinus /> : <PiPlus />}
      </div>

      {isOpen && filter.options && filter.options.length > 0 && (
        <div className="flex flex-col gap-1 pl-2 mt-2">
          {filter.options.map((opt, idx) => (
            <span
              key={opt.id || idx}
              className="text-sm text-gray-300 hover:text-white cursor-pointer"
            >
              {opt.name || opt.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterCards;
