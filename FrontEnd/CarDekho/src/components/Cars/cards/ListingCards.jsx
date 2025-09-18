import logo from "../../../assets/logo.jpg"
import { BASE_URL } from "../../../utils/constants";

const ListingCards = ({
  BrandName,
  ModelName,
  FuelType,
  Transmission,
  Year,
  Mileage,
  Price,
  CityName,
  Description,
  Images = []
}) => {
  const imageUrl = Images.length > 0 
    ? `${BASE_URL}${Images[0]}`  : logo;

  return (
    <div className="card bg-base-100 shadow-sm rounded-2xl w-96">
      <figure className="h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={`${BrandName} ${ModelName}`}
          className="object-cover w-full h-full"
        />
      </figure>

      <div className="card-body">
    
        <h2 className="card-title text-lg font-bold">
          {BrandName} {ModelName} ({Year})
        </h2>

  
        <p className="text-purple-600 font-semibold text-md">
          ${Price} <span className="text-gray-500"> • {CityName}</span>
        </p>

      
        <div className="flex flex-wrap gap-2 mt-2 text-sm">
          <span className="badge badge-outline">{FuelType}</span>
          <span className="badge badge-outline">{Transmission}</span>
          <span className="badge badge-outline">{Mileage} km</span>
        </div>

     
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {Description}
        </p>

        
        <div className="card-actions justify-end mt-3">
          <button className="btn btn-sm btn-outline btn-primary">
            View Seller Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCards;
