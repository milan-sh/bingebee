import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CommentFormSchema,
  type CommentFormData,
} from "@/schemas/comment.schema";

type CommentFormProps = {
  avatar?: string;
  fullName?: string;
  initialValue?: string;
  placeholder?: string;
  submitLabel?: string;
  isPending?: boolean;
  autoFocus?: boolean;
  showAvatar?: boolean;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
};

const CommentForm = ({
  avatar,
  fullName,
  initialValue = "",
  placeholder = "Add a comment...",
  submitLabel = "Comment",
  isPending = false,
  autoFocus = false,
  showAvatar = false,
  onSubmit,
  onCancel,
}: CommentFormProps) => {
  const [focused, setFocused] = useState(autoFocus);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<CommentFormData>({
    resolver: zodResolver(CommentFormSchema),
    mode: "onChange",
    defaultValues: { content: initialValue },
  });

  const submitHandler: SubmitHandler<CommentFormData> = ({ content }) => {
    onSubmit(content);
    if (!onCancel) {
      reset({ content: "" });
      setFocused(false);
    }
  };

  const handleCancel = () => {
    reset({ content: initialValue });
    setFocused(false);
    onCancel?.();
  };

  const { ref: contentRef, ...contentRest } = register("content");

  const showActions = focused || onCancel || isDirty;

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex w-full gap-3">
      {showAvatar && (
        <Avatar>
          <AvatarImage src={avatar} alt={fullName} />
          <AvatarFallback>
            {fullName?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      )}
      <div className="min-w-0 flex-1">
        <Textarea
          {...contentRest}
          ref={(el) => {
            contentRef(el);
            if (autoFocus && el) el.focus();
          }}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          className="min-h-10 resize-none rounded-none border-x-0 border-t-0 border-b border-input px-0 focus-visible:border-b-foreground focus-visible:ring-0"
        />
        {errors.content && (
          <p className="mt-1 text-xs text-destructive">
            {errors.content.message}
          </p>
        )}
        {showActions && (
          <div className="mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="rounded-full"
              disabled={!isValid || isPending || !isDirty}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
