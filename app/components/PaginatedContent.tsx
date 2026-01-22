"use client";

import { ReactNode, useState, useRef, useLayoutEffect } from "react";
import Button from "./Button";
import Chevron from "@/icons/chevron.svg";

interface PaginatedContentProps {
  children: ReactNode[];
}

export default function PaginatedContent({ children }: PaginatedContentProps) {
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const contentContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentContainerRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContainerWidth(302); // or contentContainerRef.current.offsetWidth
      setPages(children.length);
    }
  }, [children]);

  const nextPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const translateXValue = currentPage * containerWidth;

  return (
    <div
      ref={contentContainerRef}
      className="relative flex flex-col justify-center w-full h-full max-w-[320px] overflow-hidden px-2"
    >
      <div
        className="w-full duration-300 ease-in-out flex"
        style={{ transform: `translateX(-${translateXValue}px)` }}
      >
        {children.map((pageContent, index) => (
          <div key={index} className="w-full shrink-0 p-4">
            {pageContent}
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-4 rounded-lg">
          <Button typeStyle="tertiary" onClick={prevPage} className="p-2">
            {/* <Chevron className="rotate-180 w-8 h-8" /> */}
            {"<"}
          </Button>

          <span className="text-sm font-semibold">
            {currentPage + 1} / {pages}
          </span>

          <Button typeStyle="tertiary" onClick={nextPage} className="p-2">
            {/* <Chevron className="w-8 h-8" /> */}
            {">"}
          </Button>
        </div>
      )}
    </div>
  );
}
