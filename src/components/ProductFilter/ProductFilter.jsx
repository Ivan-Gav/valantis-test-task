import useFields from "../../hooks/useFields";
import s from "./ProductFilter.module.css";
import FilterItem from "./FilterItem";
import CloseButton from "../../ui/CloseButton/CloseButton";

const LABELS = {
  product: "Наименование",
  brand: "Бренд",
  price: "Цена",
};

export default function ProductFilter(props) {
  const {
    activeField,
    setActiveField,
    search,
    setSearch,
    setFilterBy,
    refetch,
    setPage,
    closeDrawer,
  } = props;
  const { fields } = useFields(activeField);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (search) {
      setPage(1);
      setFilterBy(`${LABELS[activeField]}: ${search}`);
    }
    refetch();
    setSearch("");
    setActiveField("product");
    closeDrawer();
  };

  const onResetClick = () => {
    setFilterBy("");
    setActiveField("product");
    setSearch("");
  };

  const onSelectChange = (e) => {
    setSearch("");
    setActiveField(e.target.value);
  };

  return (
    <div className={s.container}>
      <div className={s.header_box}>
        <h3 className={s.header}>Фильтр</h3>
        <CloseButton onClick={closeDrawer} />
      </div>

      <form className={s.filter} id="filter_form" onSubmit={onSubmit}>
        <fieldset className={s.filter}>
          <FilterItem
            label={LABELS.product}
            name="product"
            onSelectChange={onSelectChange}
            checked={activeField === "product"}
            value={search}
            onValueChange={(e) => setSearch(e.target.value)}
          />

          <FilterItem
            label={LABELS.brand}
            name="brand"
            onSelectChange={onSelectChange}
            checked={activeField === "brand"}
            value={search}
            onValueChange={(e) => setSearch(e.target.value)}
          />

          <FilterItem
            label={LABELS.price}
            name="price"
            onSelectChange={onSelectChange}
            checked={activeField === "price"}
            value={search}
            onValueChange={(e) => setSearch(e.target.value)}
          />
        </fieldset>

        <datalist id={`${activeField}-list`}>
          {!!fields &&
            fields.length &&
            fields.map((fld, i) => <option key={`${i}_${fld}`} value={fld} />)}
        </datalist>

        <button className={s.submit} type="submit">
          Искать
        </button>

        <button
          className={s.reset}
          type="button"
          onClick={onResetClick}
          onBlur={closeDrawer}
        >
          Сбросить
        </button>
      </form>
    </div>
  );
}
