function BaseSkeleton() {
    const renderSkeleton = () => (
        <div className="bg-gray-200 rounded-xl animate-pulse h-[350px] w-full"></div>
    );

    return (
        <div className="container mx-auto bg-gradient-to-r from-gray-100 to-white  rounded-2xl  relative">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
                {Array.from({ length: 1 }).map((_, index) => (
                    <div key={index}>{renderSkeleton()}</div>
                ))}
            </div>
        </div>
    );
}

export default BaseSkeleton;
