"use client";

import Profile from "@/app/components/sections/Profile";
import Projects from "@/app/components/sections/Projects";
import StarSeparator from "@/app/components/StarSeparator";
import useGame from "@/app/utils/useGame";
import React from "react";

const SCALE = 4;

export default function Home() {
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const _ = useGame({ canvasContainerRef, scale: SCALE });

  return (
    <>
      <section className="game-section">
        <div
          className="overflow-hidden mx-auto"
          style={{
            minHeight: 106 * SCALE,
            maxWidth: "90%",
          }}
          ref={canvasContainerRef}
        />
      </section>

      <StarSeparator />

      <main className="pt-20">
        <Profile />
        <StarSeparator />
        <Projects />
      </main>
    </>
  );
}
