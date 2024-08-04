import { MoveLeft } from "lucide-react";
import Button from "./shared/Button";
import Avatar from "boring-avatars";
import { Link } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const { profile } = useSelector((store) => store.user);
  useProfile();
  return (
    <div className="w-[60%]">
      <div>
        <div className="flex gap-4 items-center p-2 border-b">
          <Link to={"/"}>
            <Button
              className={
                "rounded-full p-2 hover:bg-gray-200 w-fit cursor-pointer"
              }
            >
              <MoveLeft className="w-10 h-10 p-1" />
            </Button>
          </Link>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1516705346105-1604914311cc?q=80&w=1682&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-52 object-cover aspect-video"
            alt=""
          />
          <div className="absolute bottom-0 left-0  flex justify-between items-center p-4 w-full   ">
            <div className="flex flex-col border-white border-4 rounded-full">
              <Avatar size={120} />
            </div>
          </div>
        </div>
        <div className="mt-1 flex justify-between p-3">
          <div>
            <h1 className="text-xl text-center font-bold">{profile?.name}</h1>
            <p className="text-base text-center">@{profile?.username}</p>
          </div>
          <div>
            <Button
              className={
                "hover:bg-gray-200 border font-bold px-4 py-1 md:py-2 rounded-3xl text-sm cursor-pointer"
              }
            >
              Edit Profile
            </Button>
          </div>
        </div>
        <div className="p-3 text-gray-600 font-medium">
          <p>
            🌍 Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            sapiente non, quia voluptatum, illum rem ut qui eum aut architecto
            voluptates cum doloribus iste beatae? Non asperiores pariatur
            repudiandae .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
