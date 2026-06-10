import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import ChannelBanner from "@/components/shared/channel/ChannelBanner";
import ChannelAvatar from "@/components/shared/channel/ChannelAvatar";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import PersonalInfoTab from "@/components/shared/profile/PersonalInfoTab";
import ChangePasswordTab from "@/components/shared/profile/ChangePasswordTab";

export const Route = createFileRoute("/profile/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4 text-center text-muted-foreground">
        You need to be signed in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-2 p-3 sm:p-4">
      <ChannelBanner coverImage={user.coverImage} isOwner alwaysEditable />

      <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-center">
        <ChannelAvatar
          avatar={user.avatar}
          fullName={user.fullName}
          isOwner
          alwaysEditable
        />

        <div className="flex flex-col space-y-0.5 flex-1 min-w-0">
          <h1 className="font-bold text-xl truncate">{user.fullName}</h1>
          <p className="text-muted-foreground text-sm">@{user.username}</p>
          <p className="text-muted-foreground text-sm truncate">{user.email}</p>
        </div>

        <Link to="/c/$username" params={{ username: user.username }}>
          <Button variant="outline" className="h-10 px-4">
            <ArrowLeft className="mr-2" size={16} />
            View Channel
          </Button>
        </Link>
      </div>
      <Tabs defaultValue="personal-info" className="w-full mt-6">
        <TabsList className="w-full">
          <TabsTrigger value="personal-info">Personal Information</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>
        <Separator/>
        <PersonalInfoTab/>
        <ChangePasswordTab/>
      </Tabs>
    </div>
  );
}
