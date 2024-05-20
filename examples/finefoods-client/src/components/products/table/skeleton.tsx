export const ProductsTableSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
        <div key={index} className="h-40 p-4 border-b border-gray-100">
          <div className="animate-pulse flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <div className="h-32 w-32 flex-none rounded-full bg-gray-200" />
            <div className="flex-auto flex flex-col gap-1 text-center md:text-left">
              <div className="h-7 bg-gray-200 w-1/6" />
              <div className="h-6 bg-gray-200 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
