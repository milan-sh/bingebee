import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import type { Video } from "@/api/video.api";
import { useGetChannelVideos } from "@/hooks/video/useGetChannelVideos";
import {
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  Video as VideoIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertDialog } from "@/components/ui/alert-dialog";
import DeleteVideoAlert from "./DeleteVideoAlert";
import { useDeleteVideo } from "@/hooks/video/useDeleteVideo";
import { useToggleVideoStatus } from "@/hooks/video/useToggleVideoStatus";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

const formatDuration = (seconds: number) => {
  if (!seconds || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const cellPad = "py-3.5";

const VideoRow = ({ video }: { video: Video }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutate: deleteVideo, isPending: isDeleting } = useDeleteVideo();
  const { mutate: togglePublish } = useToggleVideoStatus();

  const handleTogglePublish = (videoId: string) => {
    togglePublish(videoId);
  };

  const handleEdit = () => {
    // TODO: open edit dialog / route once an update endpoint exists.
    toast.info("Edit coming soon");
  };

  const handleDelete = () => {
    deleteVideo(video._id, {
      onSuccess: () => setDeleteOpen(false),
    });
  };

  return (
    <TableRow className="group text-center">
      {/* Visibility switch */}
      <TableCell className={`${cellPad} pl-4`}>
        <Switch
          checked={video.isPublished}
          onCheckedChange={() => handleTogglePublish(video._id)}
          aria-label={`Toggle visibility for ${video.title}`}
        />
      </TableCell>

      {/* Published / Unpublished */}
      <TableCell className={cellPad}>
        <Badge variant={video.isPublished ? "default" : "secondary"}>
          {video.isPublished ? "Published" : "Unpublished"}
        </Badge>
      </TableCell>

      {/* Thumbnail + title */}
      <TableCell className={`${cellPad} text-left`}>
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={video.thumbnail} alt={video.title} />
            <AvatarFallback>
              {video.title?.charAt(0).toUpperCase() ?? "V"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium line-clamp-1 max-w-[20rem]">
              {video.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDuration(video.duration)}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Views */}
      <TableCell className={cellPad}>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground tabular-nums">
          <Eye className="size-4" />
          {video.views.toLocaleString()}
        </span>
      </TableCell>

      {/* Date uploaded */}
      <TableCell
        className={`${cellPad} text-muted-foreground whitespace-nowrap`}
      >
        {formatDate(video.createdAt)}
      </TableCell>

      {/* Manage */}
      <TableCell className={`${cellPad} pr-4 text-right`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100"
              aria-label={`Manage ${video.title}`}
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={handleEdit}>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDeleteOpen(true)}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DeleteVideoAlert
            title={video.title}
            onConfirm={handleDelete}
            isDeleting={isDeleting}
          />
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};

const headClass =
  "text-muted-foreground text-sm font-semibold tracking-wide text-center";

const ChannelVideos = () => {
  const { data: videos = [], isPending, error } = useGetChannelVideos();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <section className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border">
        <h2 className="font-semibold">Your videos</h2>
        {!isPending && videos.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {videos.length} {videos.length === 1 ? "video" : "videos"}
          </span>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-muted/40">
            <TableHead className={`${headClass} pl-4`}>Visibility</TableHead>
            <TableHead className={headClass}>Status</TableHead>
            <TableHead className={`${headClass} text-left`}>Video</TableHead>
            <TableHead className={headClass}>Views</TableHead>
            <TableHead className={headClass}>Date uploaded</TableHead>
            <TableHead className={`${headClass} pr-4 text-right`}>
              Manage
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i} className="hover:bg-transparent">
                <TableCell colSpan={6} className="px-4">
                  <Skeleton className="h-10 w-full rounded-md" />
                </TableCell>
              </TableRow>
            ))
          ) : videos.length > 0 ? (
            videos.map((video) => <VideoRow key={video._id} video={video} />)
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={6} className="py-14">
                <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
                  <VideoIcon className="size-8 opacity-50" />
                  <p className="text-sm">No video uploaded yet.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default ChannelVideos;
