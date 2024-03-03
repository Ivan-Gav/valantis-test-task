import s from "./FilterItem.module.css";
import useFields from "../../hooks/useFields";

export default function FilterItem(props) {
  const { label, name, onSelectChange, checked, value, onValueChange } = props;
  const { fields } = useFields(name);

  const Input = () => {
    return (
      <>
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

        <datalist id={`${name}-list`}>
          {!!fields &&
            fields.length &&
            fields.map((fld, i) => <option key={`${i}_${fld}`} value={fld} />)}
        </datalist>
      </>
    );
  };

  const Select = () => {
    return (
      <div className={s.input_box}>
        <select
          className={s.select}
          name={name}
          id={name}
          value={value}
          onChange={onValueChange}
          disabled={!checked}
        >
          <option disabled></option>
          {!!fields &&
            fields.length &&
            fields.map((fld, i) => (
              <option key={`${i}_${fld}`} value={fld}>
                {fld}
              </option>
            ))}
        </select>
      </div>
    );
  };

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

        {name === "product" ? <Input /> : <Select />}
      </label>
    </>
  );
}