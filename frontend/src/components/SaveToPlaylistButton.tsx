import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FolderPlus } from "lucide-react";

const SaveToPlaylistButton = () => {
  return (
    <Popover>
      <PopoverTrigger className="flex justify-between items-center gap-2 border px-4 py-1.5 rounded-lg bg-white text-black cursor-pointer">
        <FolderPlus strokeWidth="1.50px" size={20} /> Save
      </PopoverTrigger>
      <PopoverContent className="w-64 mt-2 border text-white bg-neutral-950 flex flex-col justify-center items-start rounded-lg py-2 px-4">
        <h3 className="font-semibold text-lg mb-4 mx-auto">Save to playlist</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Checkbox id="later" />
            <Label htmlFor="later" className="text-base">
              Watch later
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="later" />
            <Label htmlFor="later" className="text-base">
              Watch later
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="later" />
            <Label htmlFor="later" className="text-base">
              Watch later
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="later" />
            <Label htmlFor="later" className="text-base">
              Watch later
            </Label>
          </div>
        </div>
        <div className="mt-2 w-full">
          <Label htmlFor="playlist-name" className="text-base">
            Name
          </Label>
          <Input
            id="playlist-name"
            placeholder="Enter playlist name"
            className="mt-1 w-full"
          />
        </div>
        <button className="px-4 py-1 mx-auto mt-4 text-black bg-primary rounded-lg cursor-pointer">
          Create new playlist
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default SaveToPlaylistButton;
