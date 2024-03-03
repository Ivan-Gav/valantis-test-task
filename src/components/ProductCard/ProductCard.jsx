import s from "./ProductCard.module.css";

export default function ProductCard(props) {
  const { id, product, brand, price } = props;

  return (
    <div className={s.card}>
      <h3 className={s.product}>{product}</h3>
      <p className={s.brand}>{brand || " "}</p>
      <p className={s.id}>Арт.: {id}</p>
      <p className={s.price}>
        {new Intl.NumberFormat("ru-RU").format(price)}
        <span> ₽</span>
      </p>
    </div>
  );
}
