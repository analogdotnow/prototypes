import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

const VideoConferencingButton = () => {
  return (
    <div className="px-4">
      <Button
        variant="secondary"
        type="button"
        className="bg-input/70 text-muted-foreground shadow-none hover:bg-input/40 w-full text-[0.8rem] h-7 select-none"
      >
        <Video /> Link Video Conferencing
      </Button>
    </div>
  );
};

export default VideoConferencingButton;
