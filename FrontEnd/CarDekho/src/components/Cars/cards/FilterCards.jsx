import { PiMinus, PiPlus } from 'react-icons/pi';
import getBgClass from '../../../utils/css/getBackground';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addListingFilter, removeListingFilter } from '../../../redux/slice/listingFliterSlice';

const FilterCards = ({ filter, isOpen, onToggle }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const selectedFilters = useSelector(store => store.listingFilter.listingFilter);

  const handleCheckbox = (opt, checked) => {
    if (opt.range) {
      const [min, max] = opt.range;
      if (checked) {
        dispatch(addListingFilter({ minPrice: min, maxPrice: max }));
      } else {
        dispatch(removeListingFilter("minPrice"));
        dispatch(removeListingFilter("maxPrice"));
      }
    } else {
      if (checked) {
        dispatch(addListingFilter({ [filter.filter_key]: opt.id }));
      } else {
        dispatch(removeListingFilter(filter.filter_key));
      }
    }
  };

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

      {isOpen && filter.options?.length > 0 && (
        <div className="flex flex-col gap-1 pl-2 mt-2">
          {filter.options.map((opt, idx) => {
            const value = opt.name || opt.label;
            const isChecked =
              opt.range
                ? selectedFilters.minPrice === opt.range[0] &&
                  selectedFilters.maxPrice === opt.range[1]
                : selectedFilters[filter.filter_key] === opt.id;

            return (
              <label
                key={opt.id || idx}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => handleCheckbox(opt, e.target.checked)}
                />
                {value}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterCards;
