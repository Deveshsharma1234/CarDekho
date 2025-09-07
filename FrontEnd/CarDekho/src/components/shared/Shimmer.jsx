const Shimmer = () => {
  return (
    <div className="shimmer-card bg-white rounded-lg shadow-md p-4 animate-pulse">
      {/* Shimmer Image */}
      <div className="shimmer-image bg-gray-200 h-48 rounded-lg"></div>

      {/* Shimmer Info Section */}
      <div className="info mt-4 space-y-3">
        <div className="shimmer-title bg-gray-200 h-6 rounded"></div>
        <div className="shimmer-rating bg-gray-200 h-4 w-1/2 rounded"></div>
        <div className="shimmer-cusine bg-gray-200 h-4 w-3/4 rounded"></div>
        <div className="shimmer-price bg-gray-200 h-4 w-1/3 rounded"></div>
      </div>
    </div>
  );
};

export default Shimmer;
