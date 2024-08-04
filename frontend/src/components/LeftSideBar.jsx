import { Link, useNavigate } from "react-router-dom";
import { menuItems } from "../lib/Constants";
import Button from "./shared/Button";
import axios from "axios";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/logout", { withCredentials: true });
      if (data.success) {
        toast.success("Logout Successfully");
        navigate("/login");
        // console.log("Successfully logged out");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="border-r pr-8 w-[20%] ">
      <div>
        <div className="pt-4 flex justify-center items-center">
          <img src="logo.png" className="w-8 h-8" />
        </div>
      </div>
      <div className="space-y-3 py-4">
        {menuItems.map((item, index) => {
          return (
            <Link
              to={item.href}
              key={index}
              className="flex items-center gap-5 ml-2 px-5 py-2 rounded-full  hover:bg-slate-300 w-full cursor-pointer"
            >
              <item.icon
                width={24}
                height={24}
                className="hidden lg:flex fill-[#00000000] text-gray-900"
              />
              <h1 className="lg:text-xl text-base lg:font-bold font-medium">
                {item.name}
              </h1>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-5 ml-2 px-5 py-2 rounded-full  hover:bg-slate-300 w-full cursor-pointer"
        >
          <LogOut
            width={24}
            height={24}
            className="hidden lg:flex fill-[#00000000] text-gray-900"
          />
          <h1 className="lg:text-xl text-base lg:font-bold font-medium">
            Logout
          </h1>
        </button>
      </div>
      <Button
        className={
          "flex items-center justify-center gap-5 ml-2 md:px-4 md:py-3 px-3 py-2 rounded-full w-full cursor-pointer bg-blue-500 text-white text-xl font-bold"
        }
      >
        Post
      </Button>
    </div>
  );
};

export default LeftSideBar;
