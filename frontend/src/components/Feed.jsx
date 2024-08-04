import { useSelector } from "react-redux";
import { useGetOther } from "../hooks/useGetOther";
import CreateFeed from "./CreateFeed";
import CreatePost from "./CreatePost";
import Tweets from "./Tweets";
import { useGetTweets } from "../hooks/useAllTweets";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

const Feed = () => {
  const { allTweets } = useSelector((store) => store.tweet);
  const [tweets, setTweets] = useState([]);
  useGetOther();
  useGetTweets();
  useEffect(() => {
    setTweets(allTweets);
  }, [allTweets]);

  return (
    <div className="w-[50%] relative ">
      <CreateFeed />
      <div className="overflow-y-scroll h-[95vh] scroll-hidden">
        <CreatePost />
        {tweets?.length > 0 &&
          allTweets.map((tweet) => {
            return tweet && <Tweets item={tweet} key={tweet?._id} />;
          })}
      </div>
    </div>
  );
};

export default Feed;
