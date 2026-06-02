import { Loader2, MessageSquareText } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";
import { useUserPosts } from "@/hooks/post/useUserPosts";
import { useCreatePost } from "@/hooks/post/useCreatePost";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

type ChannelPostsTabProps = {
  channelId: string;
  isOwner: boolean;
};

const ChannelPostsTab = ({ channelId, isOwner }: ChannelPostsTabProps) => {
  const user = useUserStore((state) => state.user);

  const { data: posts, isPending, error } = useUserPosts(channelId);
  const { mutate: createPost, isPending: posting } = useCreatePost(channelId);

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to load posts");
  }, [error]);

  return (
    <div className="flex flex-col gap-6">
      {isOwner && (
        <PostForm
          showAvatar
          avatar={user?.avatar}
          fullName={user?.fullName}
          isPending={posting}
          onSubmit={(content) => createPost(content)}
        />
      )}

      {isPending ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} channelId={channelId} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
          <MessageSquareText className="size-8 opacity-50" />
          <p className="text-sm">
            {isOwner
              ? "You haven't posted anything yet."
              : "This channel hasn't posted anything yet."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChannelPostsTab;
