"use client";

import React, { useEffect, useState } from "react";

const SCALE = 3;

export default function useGame() {
  const [initialized, setInitialized] = useState(false);
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);

  const getWidth = () => {
    return window.innerWidth > 768 ? Math.floor(window.innerWidth * 0.9) : window.innerWidth;
  };

  useEffect(() => {
    async function init(widthSize: number = window.innerWidth) {
      const kaplay = (await import("kaplay")).default;

      const k = kaplay({
        global: true,
        root: canvasContainerRef.current || document.body,
        width: 174,
        height: 174,
        crisp: true,
        scale: SCALE,
      });

      const {
        loadSprite,
        add,
        sprite,
        pos,
        scale,
        width,
        height,
        vec2,
        rand,
        anchor,
        loop,
        wait,
        get,
        area,
        addKaboom,
        color,
        rgb,
        text,
        dt,
        choose,
        z, // Added z for z-index
      } = k;

      loadSprite("background", "/assets/image.webp", {
        sliceX: 9,
        sliceY: 9,
        anims: {
          idle: { from: 0, to: 80, loop: true, speed: 12 },
        },
      });

      loadSprite("bug", "/assets/bug_spr.png", {
        sliceX: 3,
        anims: {
          idle: { from: 0, to: 2, loop: true, speed: 12 },
        },
      });

      const bg = add([sprite("background"), pos(-20, 0), scale(0.48)]);
      bg.play("idle");

      // --- BUG TYPES CONFIGURATION ---
      const BUG_TYPES = [
        {
          name: "standard",
          color: rgb(255, 255, 255),
          scale: 0.35,
          speedMin: 40,
          speedMax: 120,
          chance: 0.65
        },
        {
          name: "heavy",
          color: rgb(180, 50, 200),
          scale: 0.5,
          speedMin: 20,
          speedMax: 50,
          chance: 0.20
        },
        {
          name: "spinner",
          color: rgb(50, 255, 50),
          scale: 0.35,
          speedMin: 100,
          speedMax: 100,
          chance: 0.15
        },
      ];

      function getOffscreenPos(margin = 40) {
        const side = choose(["top", "bottom", "left", "right"]);
        const w = width();
        const h = height();

        switch (side) {
          case "top": return vec2(rand(0, w), -margin);
          case "bottom": return vec2(rand(0, w), h + margin);
          case "left": return vec2(-margin, rand(0, h));
          case "right": return vec2(w + margin, rand(0, h));
          default: return vec2(-margin, -margin);
        }
      }

      function pickBugType() {
        const r = rand(0, 1);
        let cumulative = 0;
        for (const type of BUG_TYPES) {
          cumulative += type.chance;
          if (r <= cumulative) return type;
        }
        return BUG_TYPES[0];
      }

      function spawnBug(customPos = null, forceType = null) {
        const startPos = customPos || getOffscreenPos(30);
        const type = forceType || pickBugType();

        const bug = add([
          sprite("bug"),
          pos(startPos),
          scale(type.scale),
          color(type.color),
          anchor("center"),
          area(),
          "bug",
          // Ensure bugs are below the debug text (z-index 0 is default)
          {
            dest: vec2(width() / 2, height() / 2),
            speed: rand(type.speedMin, type.speedMax),
            typeData: type,
            isOrbiting: false,
            orbitAngle: 0,
            orbitRadius: rand(50, 70),
            orbitCenter: vec2(width() / 2, height() / 2),
            orbitSpeed: rand(1, 3) * (rand() < 0.5 ? 1 : -1),
          }
        ]);

        bug.play("idle");

        bug.onClick(() => {
          addKaboom(bug.pos, { scale: 0.5 });
          bug.destroy();
        });

        if (type.name === "spinner") {
          bug.onUpdate(() => {
            if (bug.isOrbiting) {
              bug.orbitAngle += dt() * bug.orbitSpeed;
              bug.pos = bug.orbitCenter.add(
                vec2(Math.cos(bug.orbitAngle), Math.sin(bug.orbitAngle)).scale(bug.orbitRadius)
              );
              if (bug.pos.x < bug.orbitCenter.x) bug.flipX = false;
              else bug.flipX = true;
            } else {
              const distToCenter = bug.pos.dist(bug.orbitCenter);
              if (distToCenter <= bug.orbitRadius) {
                bug.isOrbiting = true;
                bug.orbitAngle = bug.pos.sub(bug.orbitCenter).angle() * (Math.PI / 180);
              } else {
                const dir = bug.orbitCenter.sub(bug.pos).unit();
                bug.move(dir.scale(bug.speed));
                if (dir.x < 0) bug.flipX = false;
                else bug.flipX = true;
              }
            }
          });
        } else {
          const pickNewSpot = () => {
            if (!bug.exists()) return;
            bug.dest = vec2(rand(0, width()), rand(0, height()));
            bug.speed = rand(bug.typeData.speedMin, bug.typeData.speedMax);
            const waitTime = rand(0.5, 1.5);
            wait(waitTime, pickNewSpot);
          };
          pickNewSpot();
          bug.onUpdate(() => {
            const dir = bug.dest.sub(bug.pos).unit();
            bug.move(dir.scale(bug.speed));
            if (dir.x < 0) bug.flipX = false;
            else bug.flipX = true;
          });
        }
      }

      // --- BOSS LOGIC ---
      function spawnBoss() {
        const startPos = getOffscreenPos(60);
        const boss = add([
          sprite("bug"),
          pos(startPos),
          scale(0.9),
          color(rgb(255, 50, 50)),
          area(),
          anchor("center"),
          "boss",
          {
            dest: vec2(width() / 2, height() / 2),
            speed: 30,
            timer: 5,
          }
        ]);
        boss.play("idle");
        const label = boss.add([
          text("5", { size: 24, font: "monospace" }),
          anchor("center"),
          pos(0, -40),
          color(255, 255, 255)
        ]);
        boss.onClick(() => {
          addKaboom(boss.pos, { scale: 1.5 });
          boss.destroy();
        });
        const pickNewSpot = () => {
          if (!boss.exists()) return;
          boss.dest = vec2(rand(0, width()), rand(0, height()));
          wait(2.0, pickNewSpot);
        };
        pickNewSpot();
        boss.onUpdate(() => {
          const dir = boss.dest.sub(boss.pos).unit();
          boss.move(dir.scale(boss.speed));
          if (dir.x < 0) boss.flipX = false;
          else boss.flipX = true;
          boss.timer -= dt();
          label.text = Math.ceil(boss.timer).toString();
          if (boss.timer <= 0) {
            addKaboom(boss.pos, { scale: 2 });
            for (let i = 0; i < 20; i++) {
              spawnBug(boss.pos);
            }
            boss.destroy();
          }
        });
      }

      // --- INIT SPAWN ---
      spawnBug();

      let canSpawnBoss = false;
      let loopTime = 3.0;

      // --- DEBUG TEXT ---
      const debugText = add([
        text("Rate: " + loopTime.toFixed(3), { size: 10, font: "monospace" }),
        pos(5, 5),
        color(0, 255, 0),
        z(100), // High Z-index to stay on top
      ]);

      // --- RECURSIVE SPAWNER (Fixes the dynamic loop time issue) ---
      function runSpawnLoop() {
        // 1. Spawn Logic
        if (get("bug").length < 25) {
          spawnBug();
        }

        // 2. Update Speed
        // Decrement loopTime (limit to minimum 0.5s)
        if (loopTime > 1.5) {
          loopTime -= 0.05; // Increased decrement so you can actually see it change
        }

        // 3. Update Debug Text
        debugText.text = "Rate: " + loopTime.toFixed(3) + "s";

        // 4. Recursion
        // Wait for the CURRENT loopTime, then run this function again
        wait(loopTime, runSpawnLoop);
      }

      // Start the loop
      runSpawnLoop();

      // --- BOSS LOOP ---
      loop(15, () => {
        if (get("bug").length < 30 && canSpawnBoss) {
          spawnBoss();
        } else {
          canSpawnBoss = true;
        }
      });
    }

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const handleResize = () => {
      if (!canvasContainerRef.current) return;
      canvasContainerRef.current.style.filter = "blur(10px)";
      if (resizeTimer !== undefined) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (canvasContainerRef.current) {
          canvasContainerRef.current.innerHTML = "";
          init(getWidth());
          canvasContainerRef.current.style.filter = "none";
        }
      }, 150);
    };

    if (typeof window !== "undefined" && canvasContainerRef?.current) {
      window.addEventListener("resize", handleResize);
      if (!initialized) {
        init(getWidth());
        setInitialized(true);
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer !== undefined) clearTimeout(resizeTimer);
    };
  }, [initialized]);

  return <div ref={canvasContainerRef} />;
}