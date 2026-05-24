import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { Bookmark, Loader2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UnauthDropdown from "../UnauthDropdown";
import PlaylistCard from "../playlist/PlaylistCard";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePlaylistSchema,
  type CreatePlaylistData,
} from "@/schemas/playlist.schema";
import { useUserPlaylists } from "@/hooks/playlist/useUserPlaylists";
import { useAddPlaylist } from "@/hooks/playlist/useAddPlaylist";

const SaveButton = ({ videoId }: { videoId: string }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const userId = user?._id;

  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: playlists, isLoading } = useUserPlaylists(userId);
  const { mutate: createPlaylist, isPending: creating } =
    useAddPlaylist(userId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreatePlaylistData>({
    resolver: zodResolver(CreatePlaylistSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CreatePlaylistData> = (data) => {
    createPlaylist(data, {
      onSuccess: () => {
        reset();
        setDialogOpen(false);
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="lg" className="rounded-full">
            <Bookmark />
            Save
          </Button>
        </DropdownMenuTrigger>
        <UnauthDropdown
          title="Want to watch this again later?"
          description="Sign in to add this video to a playlist."
        />
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="lg" className="rounded-full">
          <Bookmark />
          Save
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80 p-3">
        <DropdownMenuLabel>Save to..</DropdownMenuLabel>

        <div className="max-h-64 overflow-y-auto px-1 py-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : playlists && playlists.length > 0 ? (
            playlists.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                playlist={playlist}
                videoId={videoId}
                ownerId={userId}
              />
            ))
          ) : (
            <p className="py-2 text-sm text-muted-foreground">
              You don't have any playlists yet.
            </p>
          )}
        </div>

        <DropdownMenuSeparator />

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full rounded-full">
              <Plus />
              New Playlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Playlist</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Title</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Playlist title"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Input
                    id="description"
                    placeholder="Playlist description"
                    className="h-12 resize-none"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="default"
                  disabled={creating || !isValid}
                >
                  {creating ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SaveButton;
