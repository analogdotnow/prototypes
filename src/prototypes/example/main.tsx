import { TextLoop } from "@/components/ui/text-loop";
import "./style.css";
import { Button } from "@/components/ui/button";
import { ShaderIcon } from "./icon";

export default function App() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center w-full gap-y-20 md:gap-y-36">
      <ShaderIcon className="animate-rotateY-pulse scale-90 md:scale-100" />
      <div className="flex flex-col md:gap-y-20 gap-y-10 items-center w-full">
        <TextLoop className="font-mono md:text-xl text-lg w-3/5 h-20 md:h-auto text-center md:w-full whitespace-normal md:whitespace-nowrap">
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
