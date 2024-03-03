import ProductCard from "../ProductCard/ProductCard";
import s from "./ProductList.module.css";

export default function ProductList(props) {
  const { ids } = props;
  return (
    <div className={s.list_container}>
      {ids.map((item) => {
        return (
          <ProductCard
            key={item.id}
            id={item.id}
            product={item.product}
            brand={item.brand}
            price={item.price}
          />
        );
      })}
    </div>
  );
}
