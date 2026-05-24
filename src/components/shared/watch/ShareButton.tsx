import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
  XShareButton,
} from "react-share";
import { toast } from "sonner";

const ShareButton = ({ title }: { title: string }) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg" className="rounded-full">
          <Share2 />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Share this video</DialogTitle>

        {/* Row 1: social targets */}
        <div className="flex items-center gap-4 overflow-x-auto py-2">
          <ShareTarget label="WhatsApp">
            <WhatsappShareButton url={url} title={title}>
              <WhatsappIcon size={48} round />
            </WhatsappShareButton>
          </ShareTarget>
          <ShareTarget label="LinkedIn">
            <LinkedinShareButton url={url} title={title}>
              <LinkedinIcon size={48} round />
            </LinkedinShareButton>
          </ShareTarget>
          <ShareTarget label="X">
            <XShareButton url={url} title={title}>
              <XIcon size={48} round />
            </XShareButton>
          </ShareTarget>
          <ShareTarget label="Email">
            <EmailShareButton url={url} subject={title} body={title}>
              <EmailIcon size={48} round />
            </EmailShareButton>
          </ShareTarget>
        </div>

        {/* Row 2: copy link */}
        <div className="flex items-center gap-2 rounded-full border bg-muted/40 p-1 pl-3">
          <Input
            readOnly
            value={url}
            onFocus={(e) => e.currentTarget.select()}
            className="h-9 flex-1 border-0 bg-transparent px-0 focus-visible:ring-0"
          />
          <Button
            size="sm"
            className="rounded-full"
            onClick={handleCopy}
            aria-label="Copy link"
          >
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ShareTarget = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex shrink-0 flex-col items-center gap-1.5">
    {children}
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

export default ShareButton;
