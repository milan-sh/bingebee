import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Channel } from "@/schemas/channel.schema";
import ChannelVideosTab from "./ChannelVideosTab";
import ChannelPlaylistsTab from "./ChannelPlaylistsTab";
import ChannelAboutTab from "./ChannelAboutTab";

type TabKey = "videos" | "playlists" | "about";

const TABS: { key: TabKey; label: string }[] = [
  { key: "videos", label: "Videos" },
  { key: "playlists", label: "Playlists" },
  { key: "about", label: "About" },
];

type ChannelTabsProps = {
  channel: Channel;
};

const ChannelTabs = ({ channel }: ChannelTabsProps) => {
  const [active, setActive] = useState<TabKey>("videos");

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex gap-6 border-b">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={cn(
              "relative pb-2 text-sm font-medium transition-colors",
              active === tab.key
                ? "text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "videos" && <ChannelVideosTab channelId={channel._id} />}
      {active === "playlists" && (
        <ChannelPlaylistsTab channelId={channel._id} />
      )}
      {active === "about" && <ChannelAboutTab channel={channel} />}
    </div>
  );
};

export default ChannelTabs;
