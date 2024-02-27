import { Fragment } from 'react';
import s from './ProductList.module.css';

export default function ProductList(props) {
  const { ids } = props;
  return (
    <div className={s.list_container}>
        <div>ID</div>
        <div>Product</div>
        <div>Brand</div>
        <div>Price</div>
      {ids.map((item) => {
      return (
        <Fragment key={item.id}>
         <div className={s.cell_id}>{item.id}</div>
         <div className={s.cell_product}>{item.product}</div>
         <div className={s.cell_brand}>{item.brand}</div>
         <div className={s.cell_price}>{item.price}</div>
        </Fragment>
      )
    })}
    </div>

  )
}
