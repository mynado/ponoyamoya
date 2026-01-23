"use client";

import { ReactNode, useState, KeyboardEvent } from "react";

type FlipCardProps = {
  children: ReactNode;
  bgIcon: React.ComponentType<{ className?: string }>;
  title: string;
  theme: "blue" | "red" | "yellow";
};

export default function FlipCard({
  children,
  bgIcon: BgIcon,
  title,
  theme,
}: FlipCardProps) {
  const themeColors: Record<FlipCardProps["theme"], string> = {
    blue: "text-spiritblue border-spiritblue",
    red: "text-spiritred border-spiritred",
    yellow: "text-spirityellow border-spirityellow",
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped((v) => !v);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div className="min-h-[450px] max-w-[320px] perspective-[1000px] cursor-pointer">
      <div
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        className={`relative w-full h-full min-h-[450px] border rounded-lg shadow-md duration-700 ease-in-out transform-3d ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center z-10">
          <h2
            className={`text-center text-3xl z-20 font-bold px-2 py-2 underline bg-white/80 w-full ${themeColors[theme]}`}
          >
            {title}
          </h2>
          <div className="absolute inset-0 w-full h-full opacity-40 grid gap-0" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))" }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <BgIcon key={i} className="w-full h-full" />
            ))}
          </div>
        </div>

        {/* Back */}
        {isFlipped && (
          <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] overflow-hidden z-20">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
