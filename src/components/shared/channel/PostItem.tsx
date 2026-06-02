import { useState } from "react";
import { MoreVertical, Pencil, ThumbsUp, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/dtformatter";
import { useUserStore } from "@/store/userStore";
import { useUpdatePost } from "@/hooks/post/useUpdatePost";
import { useDeletePost } from "@/hooks/post/useDeletePost";
import { useTogglePostLike } from "@/hooks/post/useTogglePostLike";
import type { Post } from "@/schemas/post.schema";
import PostForm from "./PostForm";

type PostItemProps = {
  post: Post;
  channelId: string;
};

const PostItem = ({ post, channelId }: PostItemProps) => {
  const currentUser = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isOwner = currentUser?._id === post.owner._id;

  const [editing, setEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate: updatePost, isPending: updating } = useUpdatePost(channelId);
  const { mutate: deletePost, isPending: deleting } = useDeletePost(channelId);
  const { mutate: toggleLike } = useTogglePostLike(channelId);

  const handleUpdate = (content: string) => {
    updatePost(
      { postId: post._id, content },
      { onSuccess: () => setEditing(false) },
    );
  };

  const handleDelete = () => {
    deletePost(post._id, { onSuccess: () => setConfirmOpen(false) });
  };

  return (
    <div className="flex gap-3 border-b pb-5">
      <Avatar>
        <AvatarImage src={post.owner.avatar} alt={post.owner.fullName} />
        <AvatarFallback>
          {post.owner.fullName?.charAt(0).toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        {editing ? (
          <PostForm
            initialValue={post.content}
            submitLabel="Save"
            isPending={updating}
            autoFocus
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">@{post.owner.username}</span>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(post.createdAt)}
              </span>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-sm">{post.content}</p>

            {/* <div className="mt-2 flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="-ml-2 gap-1.5 rounded-full text-muted-foreground"
                onClick={() => toggleLike(post._id)}
                disabled={!isAuthenticated}
                aria-pressed={post.isLiked}
                aria-label={post.isLiked ? "Unlike post" : "Like post"}
              >
                <ThumbsUp
                  className={cn(
                    "size-4",
                    post.isLiked && "fill-foreground text-foreground",
                  )}
                />
                {post.isLiked ? "Liked" : "Like"}
              </Button>
            </div> */}
          </>
        )}
      </div>

      {isOwner && !editing && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 rounded-full"
              aria-label="Post options"
            >
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onSelect={() => setEditing(true)}>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setConfirmOpen(true)}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PostItem;
