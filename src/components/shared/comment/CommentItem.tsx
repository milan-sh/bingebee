import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
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
import { formatRelativeTime } from "@/lib/dtformatter";
import { useUserStore } from "@/store/userStore";
import { useDeleteComment } from "@/hooks/comment/useDeleteComment";
import { useUpdateComment } from "@/hooks/comment/useUpdateComment";
import type { Comment } from "@/schemas/comment.schema";
import CommentForm from "./CommentForm";

type CommentItemProps = {
  comment: Comment;
  videoId: string;
};

const CommentItem = ({ comment, videoId }: CommentItemProps) => {
  const currentUser = useUserStore((state) => state.user);
  const isOwner = currentUser?._id === comment.owner._id;

  const [editing, setEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate: updateComment, isPending: updating } =
    useUpdateComment(videoId);
  const { mutate: deleteComment, isPending: deleting } =
    useDeleteComment(videoId);

  const handleUpdate = (content: string) => {
    updateComment(
      { commentId: comment._id, content },
      { onSuccess: () => setEditing(false) },
    );
  };

  const handleDelete = () => {
    deleteComment(comment._id, {
      onSuccess: () => setConfirmOpen(false),
    });
  };

  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage
          src={comment.owner.avatar}
          alt={comment.owner.fullName}
        />
        <AvatarFallback>
          {comment.owner.fullName?.charAt(0).toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        {editing ? (
          <CommentForm
            initialValue={comment.content}
            submitLabel="Save"
            isPending={updating}
            autoFocus
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">@{comment.owner.username}</span>
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(comment.createdAt)}
              </span>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-sm">
              {comment.content}
            </p>
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
              aria-label="Comment options"
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
            <AlertDialogTitle>Delete comment?</AlertDialogTitle>
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

export default CommentItem;
