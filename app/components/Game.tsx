"use client";

import StarSeparator from "@/app/components/StarSeparator";
import useGame from "@/app/utils/useGame";
import React from "react";

const SCALE = 4;

export default function Game() {
  const canvasContainerRef = React.useRef<HTMLDivElement | null>(null);
  const _ = useGame({ canvasContainerRef, scale: SCALE });

  return (
    <>
      <section className="game-section overflow-hidden">
        <div
          className="overflow-hidden mx-auto"
          style={{
            minHeight: 106 * SCALE,
          }}
          ref={canvasContainerRef}
        />
      </section>
      <StarSeparator id="profile" />
    </>
  );
}
