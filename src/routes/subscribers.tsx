import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { UserCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Unauth from "@/components/shared/Unauth";
import { useSubscribedChannels } from "@/hooks/subscriptions/useSubscribedChannels";
import { formatSubscribersCount } from "@/lib/subscriptionformatter";
import { useUserStore } from "@/store/userStore";

export const Route = createFileRoute("/subscribers")({
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

  const {
    data: channels = [],
    isPending,
    error,
  } = useSubscribedChannels(user?._id);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  if (!isAuthenticated || !user) {
    return (
      <Unauth
        Icon={UserCheck}
        message="Sign in to see the channels you're subscribed to"
      />
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-6 text-xl font-bold sm:text-2xl">Subscriptions</h1>

      {isPending ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border p-4">
              <Skeleton className="size-14 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : channels.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-24 text-center text-muted-foreground">
          <UserCheck className="size-10 opacity-50" />
          <p className="text-sm">You haven't subscribed to any channels yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <Link
              key={channel._id}
              to="/c/$username"
              params={{ username: channel.username }}
              className="flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-accent"
            >
              <Avatar className="size-14">
                <AvatarImage src={channel.avatar} alt={channel.fullName} />
                <AvatarFallback className="text-lg">
                  {channel.fullName?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium">{channel.fullName}</h3>
                <p className="truncate text-sm text-muted-foreground">
                  @{channel.username}
                </p>
                {typeof channel.subscribersCount === "number" && (
                  <p className="text-sm text-muted-foreground">
                    {formatSubscribersCount(channel.subscribersCount)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
