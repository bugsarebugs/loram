const MovieSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="border rounded overflow-hidden shadow bg-gray-800"
        >
          <div className="w-full h-[300px] bg-gray-700"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-shimmer"></div>
          <div className="p-2 space-y-2">
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
            <div className="h-3 bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieSkeletonGrid;
