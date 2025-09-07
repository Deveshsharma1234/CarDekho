import React from 'react';

const BrandsCard = ({ name }) => {
  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md text-center flex items-center justify-center">
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
};

export default BrandsCard;
