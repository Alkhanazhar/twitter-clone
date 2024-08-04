import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../redux/slices/userSlices";
import { useEffect } from "react";

export const useProfile = async () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((store) => store.user);
  async function fetchdata() {
    const { data } = await axios.get("/profile", {
      withCredentials: true,
    });
    dispatch(getProfileAction(data));
  }
  try {
    useEffect(() => {
      if (!profile) fetchdata();
    }, []);
  } catch (error) {
    console.log(error.message);
  }
};
