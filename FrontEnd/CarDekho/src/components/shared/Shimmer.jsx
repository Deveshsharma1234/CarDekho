const Shimmer = () => {
  return (
    <div className="card bg-base-100 shadow-sm rounded-2xl w-96 animate-pulse">
      {/* Image placeholder */}
      <div className="h-56 w-full bg-gray-200 rounded-t-2xl"></div>

      <div className="card-body space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>

        {/* Price + City */}
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>

        {/* Badges (fuel, transmission, mileage) */}
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
          <div className="h-6 w-14 bg-gray-200 rounded"></div>
        </div>

        {/* Description */}
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>

        {/* Button */}
        <div className="h-8 w-24 bg-gray-200 rounded self-end"></div>
      </div>
    </div>
  );
};

export default Shimmer;
