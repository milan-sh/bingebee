import { ThumbsDown, ThumbsUp } from "lucide-react";

const LikeDislike = () => {
  return (
    <div className="border rounded-lg flex gap-[1px] bg-neutral-600">
      <button className="px-4 py-1.5 flex items-center gap-2 bg-black rounded-l-lg hover:bg-neutral-900 cursor-pointer">
        <ThumbsUp size={20} /> <span>120</span>
      </button>
      <button className="px-4 py-1.5 flex items-center gap-2 bg-black rounded-r-lg hover:bg-neutral-900 cursor-pointer">
        <ThumbsDown size={20} /> <span>10</span>
      </button>
    </div>
  );
};

export default LikeDislike;
