import { Smile } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthCotext";
import { requestHandler } from "@/utils";
import { postTweet } from "@/api/tweet";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { toast } from "sonner";

const TweetForm = ({
  channelId,
  fetchTweets,
}: {
  channelId: string;
  fetchTweets: () => void;
}) => {
  const [posting, setPosting] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [tweet, setTweet] = useState("");

  const { user } = useAuth();

  const handleEmojiSelect = (event: { native: string }) => {
    setTweet(`${tweet}${event.native}`);
  };

  const postTweetHandler = async () => {
    if (tweet.trim() === "") return;
    await requestHandler(
      async () => await postTweet(tweet),
      setPosting,
      () => fetchTweets(),
      (err) => toast.error(err || "something went wrong.")
    );
  };

  return (
    <div className="w-full mb-2">
      {channelId === user?._id && (
        // Tweet Form
        <div className="border p-3 flex flex-col gap-2">
          <input
            type="text"
            className="outline-none text-lg w-full"
            placeholder="Post a tweet...."
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
          {/* Tweet Form */}
          <div className="w-fit relative self-end flex items-center gap-4 ">
            <button
              className="cursor-pointer"
              onClick={() => setIsEmojiOpen(!isEmojiOpen)}
            >
              <Smile size={20} />
            </button>
            {isEmojiOpen && (
              <div className="absolute top-12 -right-5 md:right-2 rounded-lg md:max-h-52 overflow-auto">
                <Picker data={data} onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
            <button
              onClick={postTweetHandler}
              disabled={posting}
              className="bg-primary text-black px-4 py-2 font-semibold cursor-pointer hover:bg-accent disabled:bg-primary/70"
            >
              {posting ? "Posting..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetForm;
