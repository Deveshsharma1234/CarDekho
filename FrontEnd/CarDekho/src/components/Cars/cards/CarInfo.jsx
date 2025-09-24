import React from 'react';
import ImageSlider from '../../shared/ImageSlilder';
import { FaSquareWhatsapp } from "react-icons/fa6";
import { BiHeart } from 'react-icons/bi';
import useAddToWishList from '../../../hooks/cars/useAddToWishList';
import { toast } from 'react-toastify';

const CarInfo = ({ param, user }) => {
  console.log( "Thsi is param to check listing id" , param);
  console.log(user);
 const addToWishList = useAddToWishList();

  const handleAddToWishList = async () => {
  try {
    const res = await addToWishList(param.ListingId);
    console.log("Added:", res);
    toast.success("Added to wishlist", { theme: "dark" });
  } catch (err) {
    if (err.response?.data?.message === "Already in wishlist") {   
      toast.info("Already in wishlist", { theme: "dark" });
    }else {
      console.error("Error adding:", err.response?.data || err.message);
      toast.error("Error adding to wishlist", { theme: "dark" });
    }
  }
};

  const handleWhatsAppRedirect = () => {
    if (!user?.Phone) return;
    let phoneNumber = user.Phone.replace(/\D/g, "");
    if (phoneNumber.length === 10) {
      phoneNumber = "+91" + phoneNumber;
    }
    const message = `Hello ${user.FirstName}, I'm interested in your ${param?.BrandName} ${param?.ModelName} (${param?.Year}). Is it still available?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank"); // opens in new tab
  };

  return (
    <div className="flex justify-center items-start py-10 bg-base-200">
      <div className="card bg-base-100 w-3/4 shadow-xl rounded-xl overflow-hidden">
        {/* Car Image */}
        <div className="w-full">
          <ImageSlider images={param?.Images} />
        </div>

        {/* Card Body */}
        <div className="card-body p-6">
          {/* Title */}
          <h2 className="card-title text-2xl font-bold text-white flex items-center justify-between">
            <span>
              {param?.BrandName} {param?.ModelName}{" "}
              <span className="text-white/50">({param?.Year})</span>
            </span>
           <div className="relative group">
  <BiHeart className="h-8 w-8 text-white cursor-pointer hover:text-red-500 transition-colors" onClick={handleAddToWishList} />
  <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ">
    Add to Wishlist
  </span>
</div>

          </h2>


          {/* Description */}
          <p className="text-base text-white-600 mt-2">
            {param?.Description}
          </p>

          {/* Car Details */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-8 mt-6 text-base text-white-700">
            <p><span className="font-semibold">Fuel:</span> {param?.FuelType}</p>
            <p><span className="font-semibold">Transmission:</span> {param?.Transmission}</p>
            <p><span className="font-semibold">Mileage:</span> {param?.Mileage.toLocaleString()} km</p>
            <p><span className="font-semibold">Price:</span> ${param?.Price}</p>
            <p><span className="font-semibold">City:</span> {param?.CityName}</p>
          </div>
          {/* Seller info */}
          {user ? (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800">Seller Info</h3>
              <p className="text-gray-700">Name: {user.FirstName} {user.LastName}</p>
              <p className="text-gray-700">Email: {user.Email}</p>
              <p className="text-gray-700">Phone: {user.Phone}</p>
            </div>
          ) : (
            <p className="mt-6 text-gray-500 italic">Loading seller info...</p>
          )}

          {/* Actions */}
          <div className="card-actions justify-evenly mt-6">
            <button className="btn btn-primary px-6">Buy Now</button>
            <button className="btn btn-secondary px-6 hover:bg-red-950"
              onClick={handleWhatsAppRedirect}>
              <FaSquareWhatsapp className='mr-2 h-10 w-10 text-white' />
              Contact Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
