import useFields from "../../hooks/useFields";

export default function ProductFilter(props) {
  const {
    activeField,
    setActiveField,
    search,
    setSearch,
    refetch,
    setPage
  } = props;
  const { fields } = useFields(activeField);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (search) { setPage(1) }
    console.log(`Search ${activeField}: ${search}`);
    refetch();
    setSearch("");
    setActiveField("product");
  };

  const onResetClick = () => {
    setActiveField("product");
    setSearch('');
    refetch();
  };

  const onSelectChange = (e) => {
    setSearch("");
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
