/* eslint-disable react/prop-types */
import axios from "axios";
import Avatar from "boring-avatars";
import { Bookmark, Delete, Heart, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../redux/slices/tweetSlices";
import { toast } from "react-toastify";

const Tweets = ({ item }) => {
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete("/delete/" + id, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("unable to delete");
      console.log(error.message);
    }
  };
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const handleLike = async (id) => {
    try {
      const { data } = await axios.put(
        "/like-tweet/" + id,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        dispatch(getRefresh());
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="border-b">
      <div>
        <div className="p-3 flex">
          <Avatar variant="sunset" />
          <div className="ml-2 w-full">
            <div className="flex items-center gap-3 ">
              <h1 className="font-bold">
                {item?.userDetails[0]
                  ? item?.userDetails[0]?.name
                  : "Anonymous"}
              </h1>
              <p className="text-gray-600 text-sm">
                {item?.userDetails
                  ? "@" + item?.userDetails[0]?.username
                  : "Anonymous"}
              </p>
            </div>
            <div className="w-full">
              <p>{item?.description}</p>
            </div>
            <div className="flex justify-between py-2">
              <div className="flex items-center">
                <Heart
                  id="likeBtn"
                  className="cursor-pointer p-2 rounded-full text-black hover:bg-red-200 w-10 h-10 "
                  onClick={() => handleLike(item?._id)}
                />{" "}
                <p>{item?.likes?.length}</p>
              </div>
              <div className="flex items-center">
                <Bookmark className="cursor-pointer p-2 rounded-full text-black hover:bg-red-200 w-10 h-10" />{" "}
                <p>{item?.bookmarks?.length}</p>
              </div>
              <div className="flex items-center">
                <MessageSquare className="cursor-pointer p-2 rounded-full text-black hover:bg-red-200 w-10 h-10" />{" "}
                <p>{item?.likes?.length}</p>
              </div>
              <div className="flex items-center">
                {user?._id === item?._id && (
                  <Delete
                    className="cursor-pointer p-2 rounded-full text-black hover:bg-red-200 w-10 h-10"
                    onClick={handleDelete}
                  />
                )}
                {/* <p>{item?.likes?.length}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweets;
