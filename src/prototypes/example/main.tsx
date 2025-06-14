import { TextLoop } from "@/components/ui/text-loop";
import "./style.css";
import { ShaderIcon } from "./icon";

export default function App() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center w-full gap-y-40">
      <ShaderIcon className="animate-rotateY-pulse" />
      <TextLoop className="font-mono text-xl w-full text-center">
        <span>This is a place to explore new ideas</span>
        <span>Experiment with UI components</span>
        <span>Collect feedback for new features</span>
        <span>Work on crafting the best UX</span>
      </TextLoop>
    </div>
  );
}
