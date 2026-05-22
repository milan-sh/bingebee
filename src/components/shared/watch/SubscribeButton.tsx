import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToggleSubscribe } from "@/hooks/subscriptions/useToggleSubscribe";
import { useUserStore } from "@/store/userStore";
import { Bell, BellRing, Loader2 } from "lucide-react";
import UnauthDropdown from "../UnauthDropdown";

type SubscribeButtonProps = {
  channelId: string;
  isSubscribed: boolean;
};

const SubscribeButton = ({ channelId, isSubscribed }: SubscribeButtonProps) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const { mutate: toggleSubscribe, isPending } = useToggleSubscribe(channelId);

  // Guests get a prompt to sign in instead of firing the mutation.
  if (!isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" className="ml-2 rounded-full">
            <Bell />
            Subscribe
          </Button>
        </DropdownMenuTrigger>
        <UnauthDropdown
          title="Want to subscribe to this channel?"
          description="Please sign in to subscribe to this channel."
        />
      </DropdownMenu>
    );
  }

  return (
    <Button
      size="lg"
      disabled={isPending}
      aria-pressed={isSubscribed}
      variant={isSubscribed ? "secondary" : "default"}
      className="ml-2 rounded-full"
      onClick={() => toggleSubscribe()}
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : isSubscribed ? (
        <BellRing />
      ) : (
        <Bell />
      )}
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
};

export default SubscribeButton;
