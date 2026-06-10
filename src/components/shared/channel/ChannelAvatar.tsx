import { useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useUpdateAvatar } from "@/hooks/user/useUpdateAvatar";

type ChannelAvatarProps = {
  avatar?: string;
  fullName?: string;
  isOwner: boolean;
  /** Keep the upload control available even when an avatar already exists. */
  alwaysEditable?: boolean;
};

const ChannelAvatar = ({
  avatar,
  fullName,
  isOwner,
  alwaysEditable = false,
}: ChannelAvatarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadAvatar, isPending } = useUpdateAvatar();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadAvatar(file);
    e.target.value = "";
  };

  const initial = fullName?.charAt(0).toUpperCase() ?? "U";
  const canUpload = isOwner && (alwaysEditable || !avatar);

  return (
    <div className="relative size-20 shrink-0 sm:size-32">
      <Avatar className="size-full">
        <AvatarImage src={avatar} alt={fullName} />
        <AvatarFallback className="text-2xl sm:text-4xl">
          {initial}
        </AvatarFallback>
      </Avatar>

      {canUpload && (
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
            aria-label="Upload profile picture"
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full bg-black/55 text-white opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100 disabled:opacity-100 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                <Camera className="size-5" />
                <span className="text-[10px] sm:text-xs font-medium">
                  Upload
                </span>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default ChannelAvatar;
