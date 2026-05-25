import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  Folder,
  HeartPlus,
  Home,
  MessageSquare,
  ThumbsUp,
  UserCheck,
  Video,
  type LucideIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { useState } from "react";
import { useSendFeedback } from "@/hooks/user/useSendFeedback";

const FEEDBACK_MAX_LENGTH = 500;

type NavLink = {
  id: number;
  icon: LucideIcon;
  name: string;
  url: string;
};

const MAIN_LINKS: NavLink[] = [
  { id: 1, icon: Home, name: "Home", url: "/" },
  { id: 2, icon: ThumbsUp, name: "Liked Videos", url: "/liked-videos" },
  { id: 3, icon: Clock, name: "History", url: "/history" },
  { id: 4, icon: Video, name: "My Content", url: "/dashboard" },
  { id: 5, icon: Folder, name: "Collections", url: "/collections" },
  { id: 6, icon: UserCheck, name: "Subscribers", url: "/subscribers" },
];

const FOOTER_LINKS: NavLink[] = [
  { id: 1, icon: HeartPlus, name: "Support", url: "https://ko-fi.com/milansingh" },
  { id: 2, icon: MessageSquare, name: "Feedback", url: "/feedback" },
];

export function AppSidebar() {
  const [feedback, setFeedback] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: sendFeedback, isPending } = useSendFeedback();

  const trimmed = feedback.trim();
  const canSubmit = trimmed.length > 0 && trimmed.length <= FEEDBACK_MAX_LENGTH;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    sendFeedback(trimmed, {
      onSuccess: () => {
        setFeedback("");
        setOpen(false);
      },
    });
  };

  return (
    <Sidebar className="top-16 h-[calc(100svh-4rem)]" collapsible="icon">
      <SidebarContent className="py-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_LINKS.map((link) => (
                <SidebarMenuItem key={link.id} className="mb-2">
                  <SidebarMenuButton asChild className="h-11 gap-3 rounded-xl">
                    <Link to={link.url} activeProps={{ "data-active": "true" }}>
                      <link.icon size={20} />
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-4">
        <SidebarSeparator className="mb-2" />
        <SidebarMenu>
          <SidebarMenuItem key={FOOTER_LINKS[0].id} className="mb-2">
            <SidebarMenuButton
              asChild
              className="h-11 gap-3 rounded-xl"
              tooltip="Buy me a coffee on Ko-fi"
            >
              <a
                href={FOOTER_LINKS[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HeartPlus size={20} />
                <span className="font-medium">{FOOTER_LINKS[0].name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key={FOOTER_LINKS[1].id} className="mb-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <SidebarMenuButton className="h-11 gap-3 rounded-xl">
                  <MessageSquare size={20} />
                  <span className="font-medium">{FOOTER_LINKS[1].name}</span>
                </SidebarMenuButton>
              </SheetTrigger>
              <SheetContent className="flex flex-col">
                <SheetHeader>
                  <SheetTitle>
                    Send your feedback to{" "}
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to="https://milan-sh.netlify.app/"
                      className="text-primary font-semibold underline"
                    >
                      Milan
                    </Link>
                  </SheetTitle>
                  <SheetDescription>
                    I value your feedback. How can I improve your experience?
                  </SheetDescription>
                </SheetHeader>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-1 flex-col gap-4"
                >
                  <FieldGroup className="px-3">
                    <Field>
                      <FieldLabel htmlFor="feedback" className="font-semibold">
                        Describe your feedback
                      </FieldLabel>
                      <FieldDescription>
                        Share suggestions, report issues, or tell me what you'd
                        love to see.
                      </FieldDescription>
                      <Textarea
                        id="feedback"
                        placeholder="What's on your mind?"
                        rows={8}
                        maxLength={FEEDBACK_MAX_LENGTH}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        onKeyDown={(e) => {
                          if (
                            (e.metaKey || e.ctrlKey) &&
                            e.key === "Enter" &&
                            canSubmit
                          ) {
                            e.preventDefault();
                            e.currentTarget.form?.requestSubmit();
                          }
                        }}
                        autoFocus
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          Tip: press{" "}
                          <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">
                            ⌘
                          </kbd>{" "}
                          <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">
                            Enter
                          </kbd>{" "}
                          to send
                        </span>
                        <span
                          className={
                            trimmed.length > FEEDBACK_MAX_LENGTH * 0.9
                              ? "text-destructive"
                              : ""
                          }
                        >
                          {trimmed.length}/{FEEDBACK_MAX_LENGTH}
                        </span>
                      </div>
                    </Field>
                  </FieldGroup>
                  <SheetFooter className="mt-auto flex-row justify-end gap-2">
                    <SheetClose asChild>
                      <Button type="button" variant="ghost">
                        Cancel
                      </Button>
                    </SheetClose>
                    <Button type="submit" disabled={!canSubmit || isPending}>
                      {isPending ? "Sending..." : "Send Feedback"}
                    </Button>
                  </SheetFooter>
                </form>
              </SheetContent>
            </Sheet>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
