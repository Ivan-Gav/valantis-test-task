import s from "./Footer.module.css";
import GitIcon from "../../ui/SVG/GitSVG";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.copyright}>
        <span>©&nbsp;2024&nbsp;</span>
        <a href="https://gavrilin.online/" target="_blank">
          Иван Гаврилин
        </a>
      </div>
      <a className={s.gitlink} href="https://github.com/Ivan-Gav/valantis-test-task" target="_blank"><GitIcon /></a>
    </footer>
  );
}
