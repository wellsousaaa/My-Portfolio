export default function StarSeparator(props: { id?: string }) {
  return (
    <img
      id={props.id}
      draggable={false}
      alt="Estrela"
      loading="lazy"
      src="/assets/star.png"
      style={{ imageRendering: "pixelated" }}
      className="absolute left-1/2 transform -translate-x-1/2 -translate-y-7"
    />
  );
}
