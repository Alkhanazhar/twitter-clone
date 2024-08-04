import Avatar from "boring-avatars";
import Button from "./shared/Button";
import { BookImage, Edit } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getRefresh } from "../redux/slices/tweetSlices";
const CreatePost = () => {
  const [description, setDescription] = useState("");
  const handleChange = (e) => {
    setDescription(e.target.value);
  };
  const dispatch = useDispatch();
  async function onSubmit() {
    try {
      const { data } = await axios.post(
        "/create-tweet",
        { description },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        dispatch(getRefresh());
        setDescription("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      <div className="p-3 flex gap-4">
        <Avatar
          size={30}
          name="Maria Mitchell"
          variant="marble"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
        <input
          type="text"
          value={description}
          onChange={handleChange}
          className="px-4 outline-none "
          placeholder="What is happening"
        />
      </div>
      <div className="flex justify-between items-center px-3 pb-1 border-b">
        <div className="flex justify-between gap-3">
          <Edit className="cursor-pointer text-blue-600" />
          <BookImage className="cursor-pointer text-blue-600" />
        </div>
        <Button
          onClick={onSubmit}
          className={
            "bg-blue-600 px-4 text-white font-medium cursor-pointer py-2 rounded-full"
          }
        >
          Post
        </Button>
      </div>
    </>
  );
};

export default CreatePost;
