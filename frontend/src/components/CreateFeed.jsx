const CreateFeed = () => {
  return (
    <div className="flex flex-col sticky top-0 left-0 right-0 w-full bg-white">
      <div className="flex justify-between ">
        <div className="cursor-pointer w-1/2 text-xl border-b p-3 drop-shadow duration-150 hover:bg-gray-200">
          <h1 className="font-bold text-gray-700 text-center">For you</h1>
        </div>
        <div className="cursor-pointer  w-1/2 text-xl border-b p-3 drop-shadow-md hover:bg-gray-200 duration-150">
          <h1 className="font-bold text-gray-700 text-center">Following</h1>
        </div>
      </div>
    </div>
  );
};

export default CreateFeed;
