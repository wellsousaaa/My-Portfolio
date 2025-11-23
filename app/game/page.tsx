"use client";

import React, { useEffect, useState } from "react";

export default function useGame() {
  const [initialized, setInitialized] = useState(false);
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const kaplay = (await import("kaplay")).default;

      const BASE_SIZE = 174;

      function computeScale() {
        const tilesX = Math.floor(window.innerWidth / BASE_SIZE);
        const tilesY = Math.floor(window.innerHeight / BASE_SIZE);

        return Math.max(1, Math.min(tilesX, tilesY)); // at least scale 1
      }

      const SCALE = computeScale();

      const k = kaplay({
        global: true,
        root: canvasContainerRef.current || document.body,
        width: BASE_SIZE,
        height: BASE_SIZE,
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
        shake,
        z,
        scene,
        go,
        rect,
        outline,
        onUpdate,
        center,
        onKeyPress,
        onClick,
        wave,
        time,
        opacity,
        fixed,
        play,
        loadSound
      } = k;

      // --- ASSETS ---
      loadSprite("background", "/assets/image.webp", {
        sliceX: 9,
        sliceY: 9,
        anims: {
          idle: { from: 0, to: 80, loop: true, speed: 12 },
        },
      });

      loadSprite("bug", "/assets/bug_spr.png", {
        sliceX: 4,
        anims: {
          idle: { from: 0, to: 3, loop: true, speed: 24 },
        },
      });

      loadSprite("bug_circle", "/assets/bug_circ_spr.png", {
        sliceX: 5,
        anims: {
          idle: { from: 0, to: 4, loop: true, speed: 12 },
        },
      });

      loadSprite("bug_bomb", "/assets/bug_bomb_spr.png", {
        sliceX: 6,
        anims: {
          idle: { from: 0, to: 4, loop: true, speed: 12 },
        },
      });

      loadSound("score", "/assets/audio/score_increment.wav");

      loadSound("mosquito_spawn", "/assets/audio/mosquito_spawn.wav");
      loadSound("mosquito_spawn_2", "/assets/audio/mosquito_spawn_2.wav");

      loadSound("mosquito_1", "/assets/audio/mosquito_1.wav");
      loadSound("mosquito_2", "/assets/audio/mosquito_2.wav");
      loadSound("mosquito_3", "/assets/audio/mosquito_3.wav");
      loadSound("mosquito_4", "/assets/audio/mosquito_4.wav");
      loadSound("mosquito_5", "/assets/audio/mosquito_5.wav");
      loadSound("mosquito_6", "/assets/audio/mosquito_6.wav");

      loadSound("bomb_mosquito", "/assets/audio/bomb_mosquito.wav");
      loadSound("bomb_explode", "/assets/audio/bomb_explode.wav");
      loadSound("bomb_spawn", "/assets/audio/bomb_spawn.wav");

      // --- GAME SCENE ---
      scene("game", () => {
        const bg = add([sprite("background"), pos(-20, 0), scale(0.48), z(-10)]);
        bg.play("idle");

        // --- GAME STATE ---
        let maxHealth = 100;
        let curHealth = 100;
        let score = 0;

        let startTime = time();

        // UI: Health Meter Container
        add([
          rect(60, 6, { radius: 1 }),
          pos(width() - 65, 5),
          color(0, 0, 0),
          outline(1, rgb(255, 255, 255)),
          z(100),
          fixed()
        ]);

        // UI: Health Meter Fill
        const healthBar = add([
          rect(58, 4, { radius: 1 }),
          pos(width() - 64, 6),
          color(0, 255, 0),
          z(101),
          fixed()
        ]);

        // UI: Score Label
        const scoreLabel = add([
          text("0", { size: 10, font: "monospace" }),
          pos(5, 5),
          color(255, 255, 255),
          z(100),
          fixed()
        ]);

        // --- BUG CONFIG ---
        const BUG_TYPES = [
          {
            name: "standard",
            scale: 0.75,
            speedMin: 40,
            speedMax: 120,
            chance: 0.50,
            sprite: "bug",
          },
          {
            name: "heavy",
            scale: 1,
            speedMin: 20,
            speedMax: 50,
            chance: 0.15,
            sprite: "bug",
          },
          {
            name: "spinner",
            scale: 0.75,
            speedMin: 100,
            speedMax: 100,
            chance: 0.15,
            sprite: "bug_circle",
          },
          {
            name: "square",
            scale: 0.8,
            speedMin: 60,
            speedMax: 80,
            chance: 0.20,
            sprite: "bug_circle", // Reusing standard bug sprite
            color: rgb(250, 250, 255) // Blue tint
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

        function spawnBug(customPos: any = null, forceType: any = null) {
          const difficulty = 1 + (time() - startTime) / 60;

          const startPos = customPos || getOffscreenPos(30);
          const type = forceType || pickBugType();

          // Scaling logic for orbiters to prevent them from being too fast
          let speedMult = difficulty;
          if (type.name === "spinner") {
            // Dampen speed increase for spinners, otherwise they become unclickable
            speedMult = 1 + (difficulty - 1) * 0.4;
          }

          const bug = add([
            "bug",
            pos(startPos),
            scale(type.scale),
            anchor("center"),
            area(),
            sprite(type.sprite),
            type.color ? color(type.color) : color(255, 255, 255),
            {
              dest: vec2(width() / 2, height() / 2),
              speed: rand(type.speedMin, type.speedMax) * speedMult,
              typeData: type,
              // Orbit Props
              isOrbiting: false,
              orbitAngle: 0,
              orbitRadius: rand(40, 60),
              orbitCenter: vec2(width() / 2, height() / 2),
              orbitSpeed: (rand(1, 2.5) * (rand() < 0.5 ? 1 : -1)) * speedMult,
              // Square Props
              squareState: 0, // 0:right, 1:down, 2:left, 3:up
              squareTimer: 0,
              squareSide: rand(40, 70),
              squareCenter: vec2(rand(40, width() - 40), rand(40, height() - 40)),
              isSquaring: false
            }
          ]);

          bug.play("idle");

          bug.onClick(() => {
            addKaboom(bug.pos, { scale: 0.5 });
            score++;
            if (score % 50 === 0) {
              play("score");
            }

            const mosquitoSoundNumber = Math.floor(rand(1, 7));
            play(`mosquito_${mosquitoSoundNumber}`, {
              volume: 0.3
            });

            scoreLabel.text = score.toString();
            // FILL LESS: Reduced from 5 to 2
            curHealth = Math.min(curHealth + 2, maxHealth);
            bug.destroy();
          });

          if (type.name === "heavy") {
            play("mosquito_spawn_2", { volume: 0.2 });
          }

          if (type.name === "square") {
            play("bomb_spawn", { volume: 0.05, speed: 1.5, detune: 30 });
          }

          if (type.name === "spinner") {
            play("mosquito_spawn", { volume: 0.2 });
            // --- ORBIT LOGIC ---
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
          } else if (type.name === "square") {
            // --- SQUARE LOGIC ---
            bug.onUpdate(() => {
              if (bug.isSquaring) {
                bug.squareTimer -= dt();
                if (bug.squareTimer <= 0) {
                  // Switch direction
                  bug.squareState = (bug.squareState + 1) % 4;
                  // Reset timer based on speed and side length
                  bug.squareTimer = bug.squareSide / bug.speed;
                }

                // Move based on state
                let dir = vec2(0, 0);
                if (bug.squareState === 0) dir = vec2(1, 0);      // Right
                else if (bug.squareState === 1) dir = vec2(0, 1); // Down
                else if (bug.squareState === 2) dir = vec2(-1, 0);// Left
                else if (bug.squareState === 3) dir = vec2(0, -1);// Up

                bug.move(dir.scale(bug.speed));

                if (dir.x !== 0) bug.flipX = dir.x > 0;

              } else {
                // Move to square center first
                const dist = bug.pos.dist(bug.squareCenter);
                if (dist < 5) {
                  bug.isSquaring = true;
                  bug.squareTimer = bug.squareSide / bug.speed;
                } else {
                  const dir = bug.squareCenter.sub(bug.pos).unit();
                  bug.move(dir.scale(bug.speed));
                  if (dir.x !== 0) bug.flipX = dir.x > 0;
                }
              }
            });
          } else {
            // --- STANDARD LOGIC ---
            const pickNewSpot = () => {
              if (!bug.exists()) return;
              bug.dest = vec2(rand(0, width()), rand(0, height()));

              const currentDiff = 1 + (time() - startTime) / 60;
              bug.speed = rand(bug.typeData.speedMin, bug.typeData.speedMax) * currentDiff;

              const waitTime = rand(0.5, 1.5) / currentDiff;
              wait(waitTime, pickNewSpot);
            };
            pickNewSpot();

            bug.onUpdate(() => {
              const distance = bug.pos.dist(bug.dest);
              if (distance < 5) {
                bug.flipX = false;
                return;
              }
              const dir = bug.dest.sub(bug.pos).unit();
              bug.move(dir.scale(bug.speed));
              if (dir.x < 0) bug.flipX = false;
              else bug.flipX = true;
            });
          }
        }

        // --- BOSS LOGIC ---
        function spawnBoss() {
          const difficulty = 1 + (time() - startTime) / 60;
          const startPos = getOffscreenPos(60);

          const boss = add([
            sprite("bug_bomb"),
            pos(startPos),
            scale(0.9),
            area(),
            anchor("center"),
            "boss",
            {
              dest: vec2(width() / 2, height() / 2),
              // Boss moves faster over time
              speed: 50 * difficulty,
              timer: difficulty < 2 ? 5 : 3,
            }
          ]);
          boss.play("idle");
          play("bomb_spawn", { volume: 0.1, speed: 0.5, detune: -50 });

          boss.onClick(() => {
            addKaboom(boss.pos, { scale: 1.5 });
            score += 10;
            if (score % 50 === 0) {
              play("score");
            }
            play("bomb_mosquito", { volume: 0.4 });
            scoreLabel.text = score.toString();
            curHealth = Math.min(curHealth + 20, maxHealth);
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
            boss.timer -= dt();

            if (boss.timer <= 0) {
              addKaboom(boss.pos, { scale: 2 });
              shake();
              curHealth -= 30;
              play("bomb_explode", { volume: 0.6 });

              // Spawn many bugs
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

        // --- DYNAMIC SPAWN LOOP ---
        function runSpawnLoop() {
          const difficulty = 1 + (time() - startTime) / 60;

          if (get("bug").length < 25) {
            spawnBug();
          }

          const nextSpawnTime = Math.max(0.4, 2.5 / difficulty);
          wait(nextSpawnTime, runSpawnLoop);
        }

        runSpawnLoop();

        // --- BOSS LOOP ---
        loop(15, () => {
          if (get("bug").length < 30 && canSpawnBoss) {
            const difficulty = 1 + (time() - startTime) / 60;
            // Spawn multiple bosses based on difficulty
            // Level 1 = 1 boss, Level 2 = 2 bosses, etc.
            const bossCount = Math.floor(difficulty);

            for (let i = 0; i < bossCount; i++) {
              // Slight stagger for multiple spawns
              wait(i * 0.5, () => spawnBoss());
            }
          } else {
            canSpawnBoss = true;
          }
        });

        // --- HEALTH DRAIN & DIFFICULTY UPDATE ---
        onUpdate(() => {
          const difficulty = 1 + (time() - startTime) / 60;

          const bugs = get("bug").length;
          const bosses = get("boss").length;

          const drainMultiplier = Math.sqrt(difficulty);

          // DRAIN FASTER: Increased base multipliers
          // Bugs: 0.2 -> 0.35, Bosses: 2.0 -> 3.5
          const drain = ((bugs * 0.30) + (bosses * 3.5)) * drainMultiplier;

          curHealth -= drain * dt();

          if (curHealth < 0) curHealth = 0;
          const ratio = curHealth / maxHealth;

          healthBar.width = 58 * ratio;

          if (ratio < 0.3) healthBar.color = rgb(255, 0, 0);
          else if (ratio < 0.6) healthBar.color = rgb(255, 200, 0);
          else healthBar.color = rgb(0, 255, 0);

          if (curHealth <= 0) {
            go("lose", { score: score });
          }
        });
      });

      // --- LOSE SCENE ---
      scene("lose", ({ score }: { score: number }) => {
        add([
          rect(width(), height()),
          color(0, 0, 0),
          opacity(0.8)
        ]);

        add([
          text("GAME OVER", { size: 16 }),
          pos(center().sub(0, 20)),
          anchor("center"),
          color(255, 0, 0)
        ]);

        add([
          text(`Score: ${score}`, { size: 12 }),
          pos(center()),
          anchor("center"),
          color(255, 255, 255)
        ]);

        add([
          text("Space to Restart", { size: 8 }),
          pos(center().add(0, 30)),
          anchor("center"),
          color(200, 200, 200),
          "blink"
        ]);

        onUpdate("blink", (t) => {
          t.opacity = wave(0.2, 1, time() * 4);
        });

        const restart = () => go("game");
        // onClick(restart);
        onKeyPress("space", restart);
      });

      go("game");
    }

    init();
  }, []);

  return <div ref={canvasContainerRef} className="w-dvw h-dvh bg-black flex items-center justify-center gnat-game-container" />;
}