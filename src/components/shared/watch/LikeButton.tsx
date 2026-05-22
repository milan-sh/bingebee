import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <Button
      variant="secondary"
      size="lg"
      className="rounded-full"
      aria-pressed={liked}
      onClick={() => setLiked((prev) => !prev)}
    >
      <ThumbsUp className={liked ? "fill-current" : undefined} />
      Like
    </Button>
  );
};

export default LikeButton;
