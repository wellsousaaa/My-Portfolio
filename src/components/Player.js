import { useState, useEffect, useRef } from "react";
import idle from "../media/wendell2.webp";
import walking from "../media/wendell.webp";
import jumping from "../media/wendelljump.png";

let walkingInterval = null;
let jumpInterval = null;
let pressed = {};

export default function Player({ blocks, darkMode }) {
  const playerRef = useRef();

  const [animation, setAnimation] = useState(idle);
  const [position, setPosition] = useState({
    x: 50,
    y: 0,
  });
  const [inverted, setInverted] = useState(true);

  useEffect(() => {
    const body = document.querySelector("body");
    body.addEventListener("keydown", handleMovement);
    body.addEventListener("keyup", cancelAnimation);

    return () => {
      body.removeEventListener("keydown", () => {});
      body.removeEventListener("keyup", () => {});
      walkingInterval = null;
      jumpInterval = null;
    };
  }, []);

  const cancelAnimation = (e) => {
    if (["ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key))
      e.preventDefault();

    const { [e.which]: id, ...rest } = pressed;
    // remove key from store
    pressed = rest;

    if (e.key === "ArrowUp") return;

    setAnimation((animation) => (animation === jumping ? animation : idle));
    clearInterval(walkingInterval);
    walkingInterval = null;
  };

  const jump = () => {
    setAnimation(jumping);
    jumpInterval = setInterval(() => {
      setPosition((state) => seethis(state));
    }, 15);
  };

  const handleMovement = (e) => {
    if (e.key === "ArrowRight" && pressed[37]) return;
    if (e.key === "ArrowLeft" && pressed[39]) return;
    if (["ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key))
      e.preventDefault();
    else return;

    if (!pressed[e.which]) handlePos();
    pressed = { ...pressed, [e.which]: true };
    // if (e.key === "ArrowUp" && !jumpInterval && animation !== jumping) {
    //   setPosition((state) => ({ ...state, y: 0 }));
    //   jump();
    //   return;
    // }
    // if (walkingInterval) return;
    // walkingInterval = setInterval(() => {

    //   setInverted(true);
    //   setAnimation((animation) =>
    //     animation === jumping ? animation : walking
    //   );
    // }

    function handlePos() {
      switch (e.key) {
        case "ArrowRight":
          walkingInterval = setInterval(() => {
            setPosition((state) =>
              state.x < 10
                ? { ...state, x: state.x + state.x / 2 + 1 }
                : state.x >= window.innerWidth - 120
                ? state
                : { ...state, x: state.x + 10 }
            );
            setInverted(true);
            setAnimation((animation) =>
              animation === jumping ? animation : walking
            );
          }, 40);
          break;
        case "ArrowLeft":
          walkingInterval = setInterval(() => {
            setPosition((state) =>
              state.x < 10
                ? { ...state, x: state.x - state.x / 2 - 1 }
                : state.x <= 10
                ? state
                : { ...state, x: state.x - 10 }
            );

            setInverted(false);
            setAnimation((animation) =>
              animation === jumping ? animation : walking
            );
          }, 40);
          break;
        case "ArrowUp":
          if (jumpInterval === null) {
            jump();
          }
          break;
        default:
          break;
      }
    }
  };

  const checkCollision = (rect1, rect2) => {
    // console.log(rect1, rect2);
    return !(
      rect1.right - 50 < rect2.left - 50 ||
      rect1.left - 50 > rect2.right - 50 ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  };

  const seethis = (state) => {
    if (state.y < -100) {
      clearInterval(jumpInterval);
      setTimeout(() => {
        setPosition((state) => ({ ...state, y: 1 }));
        setTimeout(() => {
          jumpInterval = null;
          setPosition((state) => ({ ...state, y: 0 }));
        }, 260);
      }, 250);
      return { ...state, y: -130 };
    }
    return { ...state, y: state.y - state.y / -1.7 - 2 };
  };

  useEffect(() => {
    if (position.y === 0) setAnimation(idle);
    const player = playerRef.current.getBoundingClientRect();
    const block1 = blocks[0].current.getBoundingClientRect();
    const block2 = blocks[1].current.getBoundingClientRect();
    let block3 = null;
    try {
      block3 = blocks[2].current.getBoundingClientRect();
    } catch(err) {
      block3 = null;
    }
    const block4 = blocks[3].current.getBoundingClientRect();

    const changeLocation = (local) => {
      if (window.location.hash === local) return;
      window.location.hash = local;
    };

    if (checkCollision(player, block4)) darkMode();
    else if (checkCollision(player, block1)) changeLocation("profile");
    else if (checkCollision(player, block2)) changeLocation("projects");
    else if (block3) {
      if (checkCollision(player, block3)) 
        changeLocation("contact")
    };
  }, [position.y]);

  const { x, y } = position;
  return (
    <div className="player">
      <img
        src={animation}
        ref={playerRef}
        style={{
          imageRendering: "pixelated",
          transition: "all 150ms",
          transform: `translate(${x}px, ${y}px) scaleX(${
            inverted ? "-1" : "1"
          })`,
        }}
        draggable="false"
      />
    </div>
  );
}
