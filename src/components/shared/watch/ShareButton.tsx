import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

const ShareButton = ({ title }: { title: string }) => {
  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      // user dismissed the share sheet — nothing to do
    }
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      className="rounded-full"
      onClick={handleShare}
    >
      <Share2 />
      Share
    </Button>
  );
};

export default ShareButton;
