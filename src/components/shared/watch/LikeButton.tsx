import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsVideoLiked } from "@/hooks/like/useIsVideoLiked";
import { useToggleVideoLike } from "@/hooks/like/useToggleVideoLike";
import { useUserStore } from "@/store/userStore";
import { Loader2, ThumbsUp } from "lucide-react";
import UnauthDropdown from "../UnauthDropdown";

type LikeButtonProps = {
  videoId: string;
};

const LikeButton = ({ videoId }: LikeButtonProps) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const { data } = useIsVideoLiked(videoId);
  const { mutate: toggleLike, isPending } = useToggleVideoLike(videoId);

  // Guests get a prompt to sign in instead of firing the mutation.
  if (!isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="lg" className="rounded-full">
            <ThumbsUp />
            Like
          </Button>
        </DropdownMenuTrigger>
        <UnauthDropdown
          title="Want to like this video?"
          description="Please sign in to like this video."
        />
      </DropdownMenu>
    );
  }

  return (
    <Button
      variant="secondary"
      size="lg"
      className="rounded-full"
      disabled={isPending}
      aria-pressed={data?.isLiked}
      onClick={() => toggleLike()}
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <ThumbsUp className={data?.isLiked ? "fill-current" : undefined} />
      )}
      Like
    </Button>
  );
};

export default LikeButton;
