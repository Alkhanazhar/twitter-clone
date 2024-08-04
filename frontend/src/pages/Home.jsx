import { Outlet } from "react-router-dom";
// import Feed from "../components/Feed";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";

const Home = () => {
  return (
    <div className="flex justify-between md:w-[85%] mx-auto ">
      <LeftSideBar />
      <Outlet />
      <RightSideBar />
    </div>
  );
};

export default Home;
