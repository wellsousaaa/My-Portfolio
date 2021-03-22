import { IconContext } from "react-icons";
import { ImArrowRight2, ImArrowLeft2, ImArrowUp2 } from "react-icons/im";

function TouchButton({ keyName }) {
  return (
    <div
      className={`touch-button-${keyName} touch-button`}
      onTouchStart={(e) => {
        document.body.dispatchEvent(
          new KeyboardEvent("keydown", { key: keyName })
        );
      }}
      onTouchEnd={(e) => {
        document.body.dispatchEvent(
          new KeyboardEvent("keyup", { key: keyName })
        );
      }}
    >
      <IconContext.Provider value={{ size: 35 }}>
        {keyName === "ArrowRight" ? (
          <ImArrowRight2 />
        ) : keyName === "ArrowLeft" ? (
          <ImArrowLeft2 />
        ) : (
          <ImArrowUp2 />
        )}
      </IconContext.Provider>
    </div>
  );
}

export default TouchButton;
