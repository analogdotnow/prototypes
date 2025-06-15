import { TextLoop } from "@/components/ui/text-loop";
import "./style.css";
import { Button } from "@/components/ui/button";
import { ShaderIcon } from "./icon";

export default function App() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center w-full gap-y-36">
      <ShaderIcon className="animate-rotateY-pulse" />
      <div className="flex flex-col gap-y-20 items-center w-full">
        <TextLoop className="font-mono text-xl text-center w-full">
          <span>This is a place to explore new ideas</span>
          <span>Experiment with UI components</span>
          <span>Collect feedback for new features</span>
          <span>Work on crafting the best UX</span>
        </TextLoop>
        <Button size="lg" variant="secondary" className="w-fit" asChild>
          <a
            href="https://github.com/analogdotnow/prototypes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute today
          </a>
        </Button>
      </div>
    </div>
  );
}
