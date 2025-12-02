"use client";

import Game from "@/app/components/Game";
import Contact from "@/app/components/sections/Contact";
import Profile from "@/app/components/sections/Profile";
import Projects from "@/app/components/sections/Projects";
import StarSeparator from "@/app/components/StarSeparator";
import useGame from "@/app/utils/useGame";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import React from "react";


export default function Home() {

  return (
    <>
      {/* <div className="fixed">
        <AnimatedThemeToggler />
      </div> */}
      <Game />

      <main className="pt-20">
        <Profile />
        <StarSeparator id="projects" />
        <Projects />
        <StarSeparator id="contact" />
        <Contact />
      </main>
    </>
  );
}
