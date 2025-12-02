import React, { useEffect, useState } from "react";

type UseGameProps = {
  canvasContainerRef?: React.RefObject<HTMLDivElement | null>;
  scale: number;
};


export default function useGame({ canvasContainerRef, scale: SCALE }: UseGameProps) {
  const [initialized, setInitialized] = useState(false);

  const getWidth = () => {
    return window.innerWidth > 768 ? Math.floor(window.innerWidth * 0.9) : window.innerWidth;
  };

  useEffect(() => {
    const scrollSmoothTo = (hash: string) => {
      const element = document.getElementById(hash);
      if (element) {
        element.click();
        element.focus();
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const handleBlock = (i: number) => {
      switch (i) {
        case 0:
          scrollSmoothTo("profile");
          break;
        case 1:
          scrollSmoothTo("projects");
          break;
        case 2:
          // go to /game 
          window.location.href = "/game";
          break;
        default:
          break;
      }
    }

    async function init(widthSize: number = window.innerWidth) {
      if (!canvasContainerRef) return;
      setInitialized(true);
      const kaplay = (await import("kaplay")).default;

      const newCanvas = document.createElement("canvas");
      newCanvas.style.width = `${174 * (widthSize / SCALE / 174)}px`;
      newCanvas.style.height = `135px`;
      newCanvas.style.imageRendering = "pixelated";

      const canvas = canvasContainerRef.current.appendChild(newCanvas);
      canvasContainerRef.current.style.filter = "";

      const k = kaplay({
        global: true,
        width: 174 * (widthSize / SCALE / 174),
        height: 107,
        crisp: true,
        scale: SCALE,
        canvas,
        letterbox: true,
      });

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
        width,
        height,
        scale,
        anchor,

        canvas: canvasInstance,
      } = k;

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
      loadSprite("background", "/assets/game-background-v2-v2.webp");

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
        opacity(0),
      ]);

      /// barriers
      add([
        rect(2, height()),
        pos(0, 0),
        area(),
        body({ isStatic: true }),
        opacity(0),
      ]);
      add([
        rect(2, height()),
        pos(width() - 2, 0),
        area(),
        body({ isStatic: true }),
        opacity(0),
      ]);

      const buttonCount = 3;
      const idealSpacing = width() / (buttonCount + 1);
      const spacing = Math.min(idealSpacing, 50);

      const totalWidth = spacing * (buttonCount - 1);
      const startX = (width() - totalWidth) / 2;

      const buttonY = height() / 5.5;

      for (let i = 0; i < buttonCount; i++) {
        const x = startX + spacing * i;

        const button = add([
          outline(2, rgb(0, 0, 0)),
          pos(x, buttonY),
          area({ scale: 0.8 }),
          // body({ isStatic: true }),
          sprite("button"),
          scale(1),        // <-- required so we can animate scale later,
          anchor("center"),
          "menu-button",
          {
            index: i,
          }
        ]);

        // hover: scale up smoothly
        button.onHover(() => {
          button.scaleTo(1.15);   // grows by 15%
        });

        // hover end: scale back
        button.onHoverEnd(() => {
          button.scaleTo(1);      // return to normal
        });

        // click event
        button.onClick(() => {
          console.log(`Button ${i + 1} clicked!`);
          handleBlock(i);
        });
      }


      // player (dynamic)
      const player = add([
        pos(10, height() - 50),
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

      player.onCollide("menu-button", (block) => {
        console.log(block.index);
        handleBlock(block.index);
      });

    }

    init(getWidth());

    // let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    // const handleResize = () => {
    //   if (!canvasContainerRef) return;
    //   canvasContainerRef.current.style.filter = "blur(10px)";
    //   if (resizeTimer !== undefined) {
    //     clearTimeout(resizeTimer);
    //   }
    //   resizeTimer = setTimeout(() => {
    //     canvasContainerRef.current.innerHTML = "";
    //     if (canvasContainerRef.current) init(getWidth());
    //   }, 150);
    // };

    // if (typeof window !== "undefined" && canvasContainerRef?.current) {
    //   window.addEventListener("resize", handleResize);
    //   if (!initialized) init(getWidth());
    // }

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    //   if (resizeTimer !== undefined) clearTimeout(resizeTimer);
    // };
  }, []);

  return null;
}
