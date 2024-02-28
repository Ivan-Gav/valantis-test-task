import { useState } from "react";
import useFields from "../../hooks/useFields";
import useFilter from "../../hooks/useFilter";

export default function ProductFilter() {
  const [search, setSearch] = useState("");
  const { filteredIDs, filterIDs, activeField, setActiveField, resetFilter } =
    useFilter();
  const { fields } = useFields(activeField);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = data.get(activeField);
    console.log(`${activeField}: ${value}`);
    filterIDs(activeField, value).then(() => console.log(filteredIDs));
  };

  const onResetClick = () => {
    setSearch("");
    resetFilter();
  };

  const onSelectChange = (e) => {
    setSearch("");
    resetFilter();
    setActiveField(e.target.value);
  };

  return (
    <form id="product_filter" onSubmit={onSubmit}>
      <div>Фильтровать по: </div>
      <select
        name="filter_select"
        value={activeField}
        id="filter_select"
        onChange={onSelectChange}
      >
        <option value="product">Наименование</option>
        <option value="brand">Бренд</option>
        <option value="price">Цена</option>
      </select>
      <input
        type="text"
        name={activeField}
        id={activeField}
        list={`${activeField}-list`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <datalist id={`${activeField}-list`}>
        {!!fields &&
          fields.length &&
          fields.map((fld, i) => <option key={`${i}_${fld}`} value={fld} />)}
      </datalist>
      <button type="submit">Искать</button>
      <button type="button" onClick={onResetClick}>
        Сбросить
      </button>
    </form>
  );
}
