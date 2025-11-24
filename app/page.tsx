"use client";

import Game from "@/app/components/Game";
import Profile from "@/app/components/sections/Profile";
import Projects from "@/app/components/sections/Projects";
import StarSeparator from "@/app/components/StarSeparator";
import useGame from "@/app/utils/useGame";
import React from "react";


export default function Home() {

  return (
    <>
      <Game />

      <main className="pt-20">
        <Profile />
        <StarSeparator />
        <Projects />
      </main>
    </>
  );
}
