import ImageSlilder from '../../components/shared/ImageSlilder';
import CarInfo from '../../components/Cars/cards/CarInfo';
import useListingDataWithCarId from '../../hooks/cars/useListingDataWithCarId';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useGetUserById from '../../hooks/users/useGetUserById';

const ViewCarDetails = () => {
  const { listingId } = useParams();
const { data, error } = useListingDataWithCarId({ listingId });
const userId = data?.listing?.UserId;
const { user, error: userError } = useGetUserById(userId);

console.log("UserId:", userId);
console.log("User Data:", user);

  console.log(data?.listing?.UserId);
  console.log(user);
  if (error) {
    toast.error(error.message || "Unable to fetch brands!!", { theme: "dark" });
    return null;
  }

  console.log(data);
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-1/2">
        <CarInfo param={data?.listing} user={user} />
      </div>
    </div>


  );
}

export default ViewCarDetails;
