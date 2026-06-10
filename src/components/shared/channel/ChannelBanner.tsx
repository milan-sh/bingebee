import { useRef } from "react";
import { ImagePlus, Loader2, Pencil } from "lucide-react";
import { useUpdateCoverImage } from "@/hooks/user/useUpdateCoverImage";

type ChannelBannerProps = {
  coverImage?: string;
  isOwner: boolean;
  /** Keep the upload control available even when a cover image already exists. */
  alwaysEditable?: boolean;
};

const ChannelBanner = ({
  coverImage,
  isOwner,
  alwaysEditable = false,
}: ChannelBannerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadCover, isPending } = useUpdateCoverImage();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadCover(file);
    e.target.value = "";
  };

  if (coverImage) {
    return (
      <div className="relative w-full h-44 rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={coverImage}
          alt="Channel banner"
        />
        {isOwner && alwaysEditable && (
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
              aria-label="Change cover image"
              className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black/75 disabled:opacity-70"
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Pencil className="size-4" />
              )}
              {isPending ? "Uploading..." : "Change cover"}
            </button>
          </>
        )}
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
