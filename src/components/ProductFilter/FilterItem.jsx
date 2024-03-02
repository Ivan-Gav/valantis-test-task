import s from "./FilterItem.module.css";

export default function FilterItem(props) {
  const { label, name, onSelectChange, checked, value, onValueChange } = props;

  return (
    <>
      <input
        className={s.radio}
        type="radio"
        name="filter_select"
        id={`filter_select_${name}`}
        value={name}
        checked={checked}
        onChange={onSelectChange}
      />

      <label htmlFor={`filter_select_${name}`} className={s.filteritem}>
        <h4 className={s.label}>{label}</h4>

        <div className={s.input_box}>
          <input
            className={s.input}
            type="text"
            name={name}
            id={name}
            list={`${name}-list`}
            value={value}
            onChange={onValueChange}
            disabled={!checked}
          />
        </div>
      </label>
    </>
  );
}
