import ImageSlilder from '../../components/shared/ImageSlilder';
import CarInfo from '../../components/Cars/cards/CarInfo';
import useListingDataWithCarId from '../../hooks/cars/useListingDataWithCarId';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const ViewCarDetails = () => {
    const { listingId } = useParams();
    const { data, error } = useListingDataWithCarId({ listingId });
    console.log(data);
    if (error) {
        toast.error(error.message || "Unable to fetch brands!!", { theme: "dark" });
        return null;
    }
    console.log(data);
    return (
       <div className="flex justify-center items-center min-h-screen bg-base-200">
  <div className="w-1/2">
    <CarInfo param={data?.listing} />
  </div>
</div>


    );
}

export default ViewCarDetails;
