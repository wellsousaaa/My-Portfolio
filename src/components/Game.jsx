import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

function Game() {
  const canvasRef = useRef(null);

  useEffect(() => {
    async function init() {
      const kaplay = (await import("kaplay")).default;

      const SCALE = 4;

      const {
        loadSprite,
        add,
        sprite,
        pos,
        setGravity,
        rect,
        area,
        body,
        color,
        opacity,
        outline,
        rgb,
        onKeyDown,
        onKeyRelease,
        onKeyPress,
        onUpdate,
        dt,
        isKeyDown,
        clamp,
      } = kaplay({
        global: true,
        width: 174 * (window.innerWidth / SCALE / 174),
        height: 135,
        crisp: true,
        scale: SCALE,
        canvas: canvasRef.current,
      });

      loadSprite("player", "/assets/well_sprites_v2.webp", {
        sliceX: 11, // número máximo de frames horizontais (idle tem 11)
        sliceY: 2,
        anims: {
          idle: { from: 0, to: 10, loop: true, speed: 6 },
          walking: { from: 11, to: 15, loop: true, speed: 12 },
          jumping: { from: 21, to: 21 },
        },
      });

      loadSprite("button", "/assets/plus.png");
      loadSprite("background", "/assets/game-background.webp");

      for (let i = 0; i < window.innerWidth / 2 / 174; i++) {
        add([sprite("background"), pos(i * 174, 0)]);
      }

      // set gravity
      setGravity(1200);

      // floor (static)
      add([
        rect(width(), 13),
        pos(0, height() - 13),
        area(),
        body({ isStatic: true }),
        color(0, 0, 0, 0),
        opacity(0),
      ]);

      add([
        outline(2, rgb(0, 0, 0)),
        pos(width() / 5, height() / 2.8),
        area(),
        body({ isStatic: true }),
        color(255, 215, 0),
        sprite("button"),
      ]);

      add([
        outline(2, rgb(0, 0, 0)),
        pos(width() / 4 + 25, height() / 2.8),
        area(),
        body({ isStatic: true }),
        color(255, 215, 0),
        outline(2, rgb(255, 255, 255)),
        sprite("button"),
      ]);

      // player (dynamic)
      const player = add([
        pos(10, 0),
        area(),
        body(),
        outline(2, rgb(255, 255, 255)),
        sprite("player"),
        "player",
      ]);

      player.play("idle");
      player.flipX = true;

      onKeyDown("left", () => {
        player.move(-80, 0);
        player.flipX = false;
        if (player.isGrounded() && player.curAnim() !== "walking")
          player.play("walking");
      });

      onKeyDown("right", () => {
        player.move(80, 0);
        player.flipX = true;
        if (player.isGrounded() && player.curAnim() !== "walking")
          player.play("walking");
      });

      onKeyRelease("left", () => {
        if (player.isGrounded()) player.play("idle");
      });

      onKeyRelease("right", () => {
        if (player.isGrounded()) player.play("idle");
      });

      onKeyPress("space", () => {
        if (player.isGrounded()) {
          player.jump(350);
          player.play("jumping");
        }
      });

      player.onGround(() => {
        player.play("idle");
      });

      // ✅ correct collision method in v3000+
      player.onCollide("qblock", (block) => {
        console.log("Hit the question block!");
        block.color = rgb(255, 100, 100);
      });

      // --- Player physics vars ---
      let accel = 50; // how fast to accelerate
      let maxSpeed = 30; // max horizontal speed
      let friction = 150; // how fast to slow down when no key pressed

      let velocity = 0; // current horizontal velocity

      onUpdate(() => {
        const delta = dt();

        // handle acceleration
        if (isKeyDown("right")) {
          velocity += accel * delta;
          player.flipX = true;
          if (player.isGrounded() && player.curAnim() !== "walking")
            player.play("walking");
        } else if (isKeyDown("left")) {
          velocity -= accel * delta;
          player.flipX = false;
          if (player.isGrounded() && player.curAnim() !== "walking")
            player.play("walking");
        } else {
          // apply friction when no key pressed
          if (velocity > 0) {
            velocity = Math.max(0, velocity - friction * delta);
          } else if (velocity < 0) {
            velocity = Math.min(0, velocity + friction * delta);
          }
          if (player.isGrounded() && player.curAnim() !== "idle")
            player.play("idle");
        }

        // clamp max speed
        velocity = clamp(velocity, -maxSpeed, maxSpeed);

        // apply movement
        player.move(velocity, 0);
      });
    }

    if (typeof window !== "undefined" && canvasRef.current) {
      init();
    }
  }, []);

  console.log("Rendering Game component");

  return (
    <div
      style={{
        transform: "translateY(-60px)",
      }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Game), { ssr: false });
