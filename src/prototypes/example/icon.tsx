import { cn } from "@/lib/utils";

const path =
  "M156.705 152h-41.198l-.003-73.1084-7.926.0001c-7.237 0-14.1777 4.5299-19.295 12.5933l-35.0062 47.922C48.1595 147.47 41.2188 152 33.9816 152H.00286865l-.00287701-78.8917H15.1452c7.2368 0 14.1772-4.5295 19.2944-12.592L69.45 12.5926C74.5671 4.53016 81.5074.00067839 88.7441.00055695L122.72.0000106l.003 73.1082894H176v53.6527c0 8.259-1.744 17.189-8.585 21.789-3.354 2.255-6.993 3.45-10.71 3.45Z";

export const ShaderIcon = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-[176px] h-[152px]", className)}>
      <div
        className="absolute inset-0 opacity-30 translate-x-1 translate-y-1"
        style={{
          background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
          clipPath: `path('${path}')`,
        }}
      />
      <div
        className="absolute inset-0 blur-xs"
        style={{
          background: "linear-gradient(135deg, #1e40af, #60a5fa, #dbeafe)",
          clipPath: `path('${path}')`,
        }}
      />
      <div
        className="absolute inset-0 opacity-60 -translate-x-0.5 -translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, transparent 30%, #ffffff 70%)",
          clipPath: `path('${path}')`,
        }}
      />
    </div>
  );
};
