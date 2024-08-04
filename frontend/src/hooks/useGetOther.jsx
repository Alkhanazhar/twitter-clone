import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUser } from "../redux/slices/userSlices";
import { useEffect } from "react";

export const useGetOther = async () => {
  const dispatch = useDispatch();
  const { otherUsers } = useSelector((store) => store.user);
  async function fetchdata() {
    const { data } = await axios.get("/other-users", {
      withCredentials: true,
    });
    dispatch(getOtherUser(data));
  }
  try {
    useEffect(() => {
      if (!otherUsers) fetchdata();
    }, []);
  } catch (error) {
    console.log(error.message);
  }
};
