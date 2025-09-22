import React from 'react';
import ImageSlider from '../../shared/ImageSlilder';

const CarInfo = ({ param }) => {
  console.log("Log from CarINFO", param);

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
          <h2 className="card-title text-2xl font-bold text-white-800">
            {param?.BrandName} {param?.ModelName}{" "}
            <span className="text-white-500">({param?.Year})</span>
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

          {/* Actions */}
          <div className="card-actions justify-evenly mt-6">
            <button className="btn btn-primary px-6">Buy Now</button>
            <button className="btn btn-secondary px-6">Contact Seller</button>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
