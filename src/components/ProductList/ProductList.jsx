import { Fragment } from 'react';

export default function ProductList(props) {
  const { ids } = props;
  return (
    <div>
        <div>ID</div>
        <div>Product</div>
        <div>Brand</div>
        <div>Price</div>
      {ids.map((item) => {
      return (
        <Fragment key={item.id}>
         <div>{item.id}</div>
         <div>{item.product}</div>
         <div>{item.brand}</div>
         <div>{item.price}</div>
        </Fragment>
      )
    })}
    </div>

  )
}
