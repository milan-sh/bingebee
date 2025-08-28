import { useEffect, useState } from "react";
import type { Comment } from "@/interfaces/comment";
import { LocalStorage, requestHandler } from "@/utils";
import { getCommentsByVideoId, addComment } from "@/api/comment";
import { toast } from "sonner";
import Input from "./Input";
import { formatCommentLength } from "@/utils/commentLengthFormat";
import { dateFormatter } from "@/utils/dateFormate";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

const CommentSection = ({ videoId }: { videoId: string }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [sendingComment, setSendingComment] = useState(false);
  const [comment, setComment] = useState("");


  const fetchComments = async () => {
      await requestHandler(
        async () => await getCommentsByVideoId(videoId),
        setLoading,
        (res) => {
          setComments(res.data);
        },
        (error) => {
          toast.error(error || "Something went wrong");
        }
      );
    };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentSubmit = async () => {
    if (!comment) return;
    await requestHandler(
      async () => await addComment(videoId, comment),
      setSendingComment,
      (res) => {
        setComments(res.data);
        setComment("");
      },
      (error) => {
        toast.error(error || "Something went wrong");
      }
    );
    fetchComments();
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <h3 className="font-semibold">
        {comments ? formatCommentLength(comments.length) : "No comments"}
      </h3>
      {/* Comment form */}
      <div className="flex justify-between items-center gap-2 mt-4">
        <Input
          type="text"
          placeholder="Add a comment..."
          className="w-full rounded-lg"
          value={comment}
          name="content"
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="bg-accent-foreground px-2 py-1 rounded-lg hover:bg-accent hover:text-black cursor-pointer"
        onClick={handleCommentSubmit}
        disabled={sendingComment}
        >
          {sendingComment ? "Sending..." : "Comment"}
        </button>
      </div>
      <hr className="my-4"/>
      {/* comments from here */}
      {comments && comments.map((comment)=>(
        <div key={comment._id} className="w-full mb-4 border-b pb-5 flex justify-between">
            <div className="flex gap-4">
                <img src={comment.owner.avatar} alt={comment.owner.username} className="w-10 h-10 object-cover rounded-full" />
                <div>
                    <h4>{comment.owner.fullName} · {dateFormatter(comment.createdAt)}</h4>
                    <p className="text-neutral-400 text-sm">@{comment.owner.username}</p>
                    <p className="mt-2 text-[16px]">{comment.content}</p>
                </div>
            </div>
            {/* TODO: implement later */}
            {/* options button */}
            {/* {comment.owner._id === LocalStorage.get("user")?._id && (
                <div className="h-fit">
                    <Popover>
                        <PopoverTrigger className="cursor-pointer"><EllipsisVertical strokeWidth={"1px"}/></PopoverTrigger>
                        <PopoverContent className="bg-neutral-900 p-4 rounded-md flex flex-col gap-2 group">
                            <div className="flex gap-4 px-2 py-0.5 text-neutral-400 hover:bg-accent hover:text-black rounded-lg">
                                <button className="flex gap-5 items-center cursor-pointer"><Pencil size={20}/> Edit</button>
                            </div>
                            <div className="flex gap-4 px-2 py-0.5 text-neutral-400 hover:bg-accent hover:text-black rounded-lg">
                                <button className="flex gap-5 items-center cursor-pointer"><Trash size={20}/> Delete</button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            )} */}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
