import s from "./FilterTags.module.css";

const FilterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m2 5a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1m2 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1"
      />
    </svg>
  );
};

const Close = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
      />
    </svg>
  );
};

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
