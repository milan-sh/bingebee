import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SaveButton = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved((prev) => !prev);
    toast.success(saved ? "Removed from saved" : "Saved");
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      className="rounded-full"
      aria-pressed={saved}
      onClick={handleSave}
    >
      <Bookmark className={saved ? "fill-current" : undefined} />
      Save
    </Button>
  );
};

export default SaveButton;
