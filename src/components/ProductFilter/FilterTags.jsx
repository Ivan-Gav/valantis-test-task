import s from "./FilterTags.module.css";
import Close from "../../ui/SVG/CloseSVG";
import FilterIcon from "../../ui/SVG/FilterSVG";

export default function FilterTags(props) {
  const { onFilterClick, onClearClick, filterBy } = props;

  return (
    <div className={s.container}>
      <button className={s.filter_btn} onClick={onFilterClick}>
        <FilterIcon />
        <span>Фильтр</span>
      </button>
      {!!filterBy && (
        <button className={s.clear_btn} onClick={onClearClick}>
          <span>{filterBy}</span>
          <Close />
        </button>
      )}
    </div>
  );
}
