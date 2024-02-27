import { useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import Pagination from "../components/Pagination/Pagination";
import ProductList from "../components/ProductList/ProductList";

const QTY_PER_PAGE = 50;

function CatalogPage() {
  const [ids, setIds] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  const { getIDs, getItems, isFetching } = useAPI();

  useEffect(() => {
    getIDs().then((result) => {
      const uniqueIds = [...new Set(result)];
      setIds(uniqueIds);
      console.log(`got ${uniqueIds.length} ids`);
    });
  }, [getIDs]);

  useEffect(() => {
    if (!!ids && ids.length) {
      const idsToDisplay = ids.slice(
        (page - 1) * QTY_PER_PAGE,
        page * QTY_PER_PAGE
      );
      getItems(idsToDisplay).then((result) => {
        console.log(result);
        setItems(result);
      });
    }
  }, [ids, page, getItems]);

  const onPageChange = (page) => {
    setPage(page);
    console.log(`go to ${page}`);
  };

  const totalPages = Math.ceil(ids.length / QTY_PER_PAGE);

  return (
    <>
      <h1>Hello Valantis!</h1>
      {isFetching && <h2>Loading...</h2>}
      {!isFetching && !!items.length && <ProductList ids={items} />}
      {!!ids.length && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

export default CatalogPage;