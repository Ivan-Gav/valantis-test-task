import { useEffect } from 'react';
import Pagination from "../components/Pagination/Pagination";
import ProductList from "../components/ProductList/ProductList";
import useIDs from "../hooks/useIDs";

import usePagination from "../hooks/usePagination";
import useProducts from "../hooks/useProducts";
import ProductFilter from "../components/ProductFilter/ProductFilter";

function CatalogPage() {
  const {
    ids,
    isLoading: isIDsFetching,
    activeField,
    setActiveField,
    // resetFilter,
    search,
    setSearch,
    refetch,
  } = useIDs();
  const { page, setPage, totalPages, idsToDisplay } = usePagination(ids);
  const { products, isLoading } = useProducts(idsToDisplay);

  useEffect(() => console.log(`ids changed and ids.length=${ids.length}`), [ids]);
  useEffect(() => console.log(`products changed and products.length=${products.length}`), [products]);
  useEffect(() => console.log(`idsToDisplay changed and idsToDisplay.length=${idsToDisplay.length}`), [idsToDisplay]);

  const display = {
    loader: isIDsFetching || isLoading,
    products: !(isIDsFetching || isLoading) && !!ids.length && !!products.length,
    notFound: !(isIDsFetching || isLoading) && (!ids.length || !products.length),
    pagination: !isIDsFetching && totalPages > 1,
  };

  const filterProps = {
    ids,
    activeField,
    setActiveField,
    // resetFilter,
    search,
    setSearch,
    refetch,
    setPage,
  };

  return (
    <>
      <h1>Hello Valantis!</h1>
      <ProductFilter {...filterProps} />
      {display.loader && <h2>Loading...</h2>}
      {display.notFound && <h2>Nothing found</h2>}
      {display.products && <ProductList ids={products} />}
      {display.pagination && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
}

export default CatalogPage;
