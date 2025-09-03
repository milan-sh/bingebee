import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { FolderPlus } from "lucide-react";
import {
  addVideoToPlaylist,
  createPlaylist,
  getAllPlaylist,
  removeVideoFromPlaylist,
} from "@/api/playlist";
import { useEffect, useState } from "react";
import { requestHandler } from "@/utils";
import { useAuth } from "@/context/AuthCotext";
import { toast } from "sonner";
import type { Playlist, CreatePlaylistRequest } from "@/interfaces/playlist";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Input from "./Input";

const SaveToPlaylistButton = ({ videoId }: { videoId: string }) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePlaylistRequest>();

  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [savingToPlaylist, setSavingToPlaylist] = useState(false);

  async function fetchPlaylists() {
      if(!user?._id) return;
      await requestHandler(
        async () => await getAllPlaylist(user?._id),
        setLoading,
        (res) => {
          setPlaylists(res?.data);
        },
        (error) => {
          toast.error(error || "Something went wrong");
        }
      );
    }
  
  useEffect(() => {    
    if (user?._id) {
      fetchPlaylists();
    }
  }, []);

  const onSubmit = async (data: CreatePlaylistRequest) => {
    await requestHandler(
      async () => await createPlaylist(data),
      setLoading,
      (res) => {
        toast.success("Playlist created successfully");
        setPlaylists((prev) => [...(prev || []), res.data]);
      },
      (error) => {
        toast.error(error || "Something went wrong");
      }
    );
    reset();
  };

  const handleChange = async (
    playlistId: string,
    videoId: string,
    status: boolean
  ) => {
    if (!status) {
      await requestHandler(
        async () => await addVideoToPlaylist(playlistId, videoId),
        setSavingToPlaylist,
        () => {
          toast.success("Video added to playlist successfully");
        },
        (error) => {
          toast.error(error || "Something went wrong");
        }
      );
      await fetchPlaylists();
    } else {
      await requestHandler(
        async () => await removeVideoFromPlaylist(playlistId, videoId),
        setSavingToPlaylist,
        () => {
          toast.success("Video removed from playlist successfully");
        },
        (error) => {
          toast.error(error || "Something went wrong");
        }
      );
      await fetchPlaylists();
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="flex justify-between items-center gap-2 border px-4 py-1.5 rounded-lg bg-white text-black cursor-pointer">
        <FolderPlus strokeWidth="1.50px" size={20} /> Save
      </PopoverTrigger>
      <PopoverContent className="w-64 mt-2 border text-white bg-neutral-950 flex flex-col justify-center items-start rounded-lg py-2 px-4">
        <h3 className="font-semibold text-lg mb-4 mx-auto">Save to playlist</h3>
        <div className="flex flex-col gap-2">
          {/* existing playlists */}
          {playlists &&
            playlists.map((playlist) => (
              <div key={playlist._id} className="flex items-center gap-3">
                <Checkbox
                  id={playlist._id}
                  disabled={savingToPlaylist}
                  checked={playlist.videos[0]?._id===videoId}
                  onClick={() =>
                    handleChange(
                      playlist._id,
                      videoId,
                      playlist.videos[0]?._id===videoId
                    )
                  }
                />
                <Label htmlFor={playlist._id} className="text-base">
                  {playlist.name}
                </Label>
              </div>
            ))}
        </div>
        {/* new playlist form */}
        <form className="w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 w-full">
            <Input
              type="text"
              label="Name"
              className="rounded-md"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}.</p>
            )}
          </div>
          <div className="mt-2 w-full">
            <Input
              type="text"
              label="Description"
              className="rounded-md"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 5,
                  message: "Description must be at least 5 characters long",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-600">{errors.description.message}.</p>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-1 mx-auto mt-4 text-black bg-primary rounded-lg cursor-pointer hover:bg-accent"
          >
            {loading ? "Creating..." : "Create new playlist"}
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default SaveToPlaylistButton;
