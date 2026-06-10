import { createFileRoute } from "@tanstack/react-router";
import { Folder } from "lucide-react";
import ChannelPlaylistsTab from "@/components/shared/channel/ChannelPlaylistsTab";
import Unauth from "@/components/shared/Unauth";
import { useUserStore } from "@/store/userStore";

export const Route = createFileRoute("/collections")({
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

  if (!isAuthenticated || !user) {
    return (
      <Unauth
        Icon={Folder}
        message="Sign in to view and manage your playlist collections"
      />
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-6 text-xl font-bold sm:text-2xl">Collections</h1>
      <ChannelPlaylistsTab channelId={user._id} />
    </div>
  );
}
