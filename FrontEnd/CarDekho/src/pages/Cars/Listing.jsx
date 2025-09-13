import FilterSection from '../../components/Cars/Filters/FilterSection';
import ListingSection from '../../components/Cars/Filters/ListingSection';
import { useLocation, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { addListingFilter, removeListingFilter } from '../../redux/slice/listingFliterSlice';

const Listing = () => {
    const { BrandId, CityId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();



  const filters = {};

  if (BrandId) {
    filters.brand = BrandId;
    dispatch(removeListingFilter());
     dispatch(addListingFilter({ brand: BrandId }));

}
  if (CityId) {
    filters.city = CityId
    dispatch(removeListingFilter());
    dispatch(addListingFilter({ city: CityId }));
  }

    return (
        <div className='flex justify-around '>           
            <FilterSection/>
            <ListingSection  />
        </div>
    );
}

export default Listing;
