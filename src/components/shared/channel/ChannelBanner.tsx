import { useRef } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { useUpdateCoverImage } from "@/hooks/user/useUpdateCoverImage";

type ChannelBannerProps = {
  coverImage?: string;
  isOwner: boolean;
};

const ChannelBanner = ({ coverImage, isOwner }: ChannelBannerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadCover, isPending } = useUpdateCoverImage();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadCover(file);
    e.target.value = "";
  };

  if (coverImage) {
    return (
      <div className="w-full h-44 rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={coverImage}
          alt="Channel banner"
        />
      </div>
    );
  }

  if (!isOwner) {
    return <div className="w-full h-44 rounded-lg bg-muted" />;
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
        className="group w-full h-44 rounded-lg border border-dashed border-primary bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-60"
      >
        {isPending ? (
          <Loader2 className="size-6 animate-spin" />
        ) : (
          <ImagePlus className="size-6 transition-transform group-hover:scale-110" />
        )}
        <span className="text-sm font-medium">
          {isPending ? "Uploading..." : "Upload cover image"}
        </span>
      </button>
    </>
  );
};

export default ChannelBanner;
