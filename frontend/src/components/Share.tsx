import { Forward } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";
import { useRef } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";

const Share = () => {
  const url = window.location.href
  const ref = useRef<HTMLInputElement>(null)

  const handleCopy = ()=>{
    ref.current?.select();
    if(ref.current?.value){
      window.navigator.clipboard.writeText(ref.current?.value)
      toast.success("Link copied to clipboard")
    }
  }

  return (
    <div className="border rounded-lg flex gap-[1px] bg-neutral-600">
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-1 flex items-center gap-2 bg-black rounded-lg hover:bg-neutral-900 cursor-pointer">
            <Forward size={24} />
            <span className="font-bold">Share</span>
          </button>
        </DialogTrigger>
        <DialogContent className="bg-neutral-800 border-none">
          <DialogHeader>
            <DialogTitle className="text-white">Share this video</DialogTitle>
            <DialogDescription>Share and grow together</DialogDescription>
            <div className="my-2">
              <div>
                <WhatsappShareButton className="mr-2 my-1" url={url}>
                    <WhatsappIcon size={52} round/>
                </WhatsappShareButton>
                <TwitterShareButton className="mr-2 my-1" url={url}>
                  <TwitterIcon size={52} round />
                </TwitterShareButton>
                <LinkedinShareButton className="mr-2 my-1" url={url}>
                  <LinkedinIcon size={52} round />
                </LinkedinShareButton>
                <EmailShareButton className="mr-2 my-1" url={url}>
                    <EmailIcon size={52} round/>
                </EmailShareButton>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Input ref={ref} type="text" value={url} readOnly className="max-w-[90%] rounded-sm text-white text-sm"/>
                <button 
                onClick={handleCopy}
                className="px-4 py-1 font-semibold bg-accent text-black rounded-sm cursor-pointer hover:bg-accent/50">Copy</button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Share;
