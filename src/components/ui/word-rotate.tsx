"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function WordRotate({ 
  words, 
  duration = 2500, 
  className 
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsFading(false);
      }, 300); // Wait for fade out
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <h1
        className={cn(
          "transition-opacity duration-300 transform",
          isFading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
          className
        )}
      >
        {words[index]}
      </h1>
    </div>
  );
}
