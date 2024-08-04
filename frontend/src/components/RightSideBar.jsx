import Avatar from "boring-avatars";
import { Search } from "lucide-react";

const RightSideBar = () => {
  return (
    <div className=" w-[30%] border-l h-screen">
      <div className="p-3">
        <div className="rounded-full p-3 bg-gray-200 flex gap-2">
          <Search />
          <input
            type="text"
            className="outline-none bg-transparent text-base "
            placeholder="search"
          />
        </div>
        <div className="p-1 bg-gray-200 rounded-3xl my-3">
          <h1 className="text-xl my-3 font-bold text-center">Who to Follow</h1>
          <div className="flex my-3 px-2 justify-between items-center gap-1">
            <div className="flex">
              <Avatar />
              <div className="ml-2">
                <h2 className="font-medium text-sm">Azhar</h2>
                <p className="font-medium text-xs text-gray-700">@Azhar325</p>
              </div>
            </div>
            <div>
              <button className="bg-black text-white py-1 px-2 text-sm rounded-lg">
                Follow
              </button>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
