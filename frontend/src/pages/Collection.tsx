import { Loader } from "@/components";
import { LibraryBig, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Playlist } from "@/interfaces/playlist";
import { Link } from "react-router";
import { requestHandler } from "@/utils";
import { getAllPlaylist, deletePlaylist } from "@/api/playlist";
import { useAuth } from "@/context/AuthCotext";
import { dateFormatter } from "@/utils/dateFormate";
import noVideo from "@/assets/noVideo.jpg";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Button from "@/components/Button";

const Collection = () => {
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { user } = useAuth();
  

  async function fetchPlaylists() {
    if(!user?._id) return;
      await requestHandler(
        async () => await getAllPlaylist(user?._id),
        setLoading,
        (res) => {
          if (res.data.length > 0) {
            toast.success("Playlist fetched successfully");
            setPlaylists(res.data);
          }
        },
        (err) => toast.error(err || "something went wrong.")
      );
    }

  useEffect(() => {
    if(user?._id){
      fetchPlaylists();
    }
  }, []);

  async function deletePlaylistHandler(playlistId: string) {
    await requestHandler(
      async () => await deletePlaylist(playlistId),
      setDeleting,
      () => {
        toast.success("playlist deleted successfully")
        fetchPlaylists();
      },
      (err) => toast.error(err || "something went wrong")
    );
  }

  if (loading) {
    <div className="min-h-screen">
      <Loader />{" "}
    </div>;
  }

  if (!playlists || playlists?.length === 0) {
    return (
      <div className="text-white w-full mt-4 p-6">
        <h1 className="md:text-4xl text-xl font-semibold">Playlists</h1>
        <div className="h-[50vh] w-full flex flex-col items-center justify-center gap-4 text-white">
          <div className="p-2 bg-accent rounded-full text-primary">
            <LibraryBig size={42} />
          </div>
          <h2 className="text-lg">Looks like don't have any playlist :(</h2>
          <Link to={"/"}>
            <div className="bg-primary py-1 px-4 font-semibold text-lg cursor-pointer hover:bg-accent hover:text-black">
              Start watching
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-white p-4 mt-6">
      <h1 className="md:text-4xl text-xl font-semibold">Playlists</h1>
      <hr className="my-4" />
      <div className="grid md:grid-cols-3 gap-4 py-4">
        {playlists.map((playlist) => (
          <div key={playlist._id} className="flex flex-col">
            <div className="relative mb-2">
              <img
                src={
                  playlist.videos[playlist.videos.length - 1]?.thumbnail ??
                  noVideo
                }
                alt=""
                className="h-64 w-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 flex justify-between bg-black/30 backdrop-blur-xs p-4">
                <div>
                  <p>Playlist</p>
                  <p>{dateFormatter(playlist.createdAt)}</p>
                </div>
                <p>{playlist.videos.length || 0} videos</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-gray-200 text-lg">{playlist.name}</h3>
                <p className="text-gray-200 text-[14px]">
                  {playlist.description}
                </p>
              </div>
              <Dialog>
                <DialogTrigger>
                  <div className="px-2 py-1 flex items-center justify-center hover:bg-accent/80 bg-accent rounded-sm cursor-pointer">
                    <Trash2 className="text-red-600" />
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-neutral-900 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl">
                      Do you want to delete playlist ?
                    </DialogTitle>
                    <DialogDescription>
                      Your playlist will be deleted permanently.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <button type="button" className="outline rounded-sm px-3 py-1.5 mr-3 cursor-pointer hover:bg-accent hover:text-black font-semibold">Close</button>
                    </DialogClose>
                    <Button
                      disabled={deleting}
                      onClick={()=>deletePlaylistHandler(playlist._id)}
                      type="button"
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
