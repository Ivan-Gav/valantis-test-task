import s from "./CloseButton.module.css";
import Close from "../SVG/CloseSVG";

export default function CloseButton(props) {
  const { onClick } = props;

  return (
    <button className={s.button} onClick={onClick}>
      <Close />
    </button>
  );
}
