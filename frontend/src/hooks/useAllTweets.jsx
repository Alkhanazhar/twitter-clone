/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTweets } from "../redux/slices/tweetSlices";

export const useGetTweets = async () => {
  const dispatch = useDispatch();
  const { allTweets } = useSelector((store) => store.tweet);
  const { refresh } = useSelector((store) => store.tweet);
  console.log(refresh);
  async function fetchdata() {
    const { data } = await axios.get("/get-tweets", {
      withCredentials: true,
    });
    dispatch(getTweets(data));
  }
  try {
    useEffect(() => {
      console.log("first only");
      if (!allTweets) fetchdata();
    }, []);

    useEffect(() => {
      console.log("refreshing");
      if (allTweets) fetchdata();
    }, [refresh]);
  } catch (error) {
    console.log(error.message);
  }
};
