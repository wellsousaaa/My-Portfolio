"use client";

import Profile from "@/app/components/sections/Profile";
import StarSeparator from "@/app/components/StarSeparator";
import useGame from "@/app/utils/useGame";
import React from "react";

const SCALE = 4;

export default function Home() {
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const _ = useGame({ canvasContainerRef, scale: SCALE });

  return (
    <>
      <div
        className="overflow-hidden max-w-dvw -translate-y-1"
        style={{
          minHeight: 106 * SCALE,
        }}
        ref={canvasContainerRef}
      />

      <StarSeparator />

      <Profile />
    </>
  );
}
