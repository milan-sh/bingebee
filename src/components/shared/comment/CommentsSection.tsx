import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useVideoComments } from "@/hooks/comment/useVideoComments";
import { usePostComment } from "@/hooks/comment/usePostComment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const CommentsSection = ({ videoId }: { videoId: string }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

  const { data: comments, isPending } = useVideoComments(videoId);
  const { mutate: postComment, isPending: posting } = usePostComment(videoId);

  const count = comments?.length ?? 0;

  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold">
        {count} {count === 1 ? "Comment" : "Comments"}
      </h2>

      <div className="mt-4">
        {isAuthenticated ? (
          <CommentForm
            showAvatar
            avatar={user?.avatar}
            fullName={user?.fullName}
            isPending={posting}
            onSubmit={(content) => postComment(content)}
          />
        ) : (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">
              Sign in to leave a comment.
            </p>
            <Link to="/login" className="ml-auto">
              <Button size="sm" className="rounded-full">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-5">
        {isPending ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              videoId={videoId}
            />
          ))
        ) : (
          <p className="py-2 text-sm text-muted-foreground">
            No comments yet. Be the first to share your thoughts.
          </p>
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
