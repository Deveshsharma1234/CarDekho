
import ListingCards from '../cards/ListingCards';
import useListingData from '../../../hooks/cars/useListingData';
import Shimmer from '../../shared/Shimmer';
import { toast } from 'react-toastify';

const ListingSection = () => {
  const { listing, loading, error } = useListingData();

  if (loading) return <Shimmer />;
  if (error) {
    toast.error(error.message || "Unable to fetch listings!!", { theme: "dark" });
    return null;
  }
  console.log(listing);
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Listing Section</h2>
      <div className="grid grid-cols-3 gap-4">
        {listing.length > 0 ? (
          listing.map((item) => (
            <ListingCards key={item.ListingId} {...item} />
          ))
        ) : (
         <Shimmer/>
        )}
      </div>
    </div>
  );
};

export default ListingSection;
