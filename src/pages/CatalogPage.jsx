import Pagination from "../components/Pagination/Pagination";
import ProductList from "../components/ProductList/ProductList";
import useProductIDs from "../hooks/useProductIDs";
import usePagination from "../hooks/usePagination";
import useProducts from "../hooks/useProducts";
import ProductFilter from "../components/ProductFilter/ProductFilter";

function CatalogPage() {
  const {
    ids,
    isFetching: isIDsFetching,
    isError: isIDsError,
  } = useProductIDs();
  const { page, setPage, totalPages, idsToDisplay } = usePagination(ids);
  const { products, isFetching, isError } = useProducts(idsToDisplay);

  const display = {
    error: (isIDsError || isError) && !(isIDsFetching || isFetching),
    loader: !(isIDsError || isError) && (isIDsFetching || isFetching),
    products: !(isIDsError || isError || isIDsFetching || isFetching) && !!products.length,
    pagination: !(isIDsError || isError || isIDsFetching) && totalPages > 1,
  };

  return (
    <>
      <h1>Hello Valantis!</h1>
      <ProductFilter />
      {display.error && <h2>An Error occured. please try again</h2>}
      {display.loader && <h2>Loading...</h2>}
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
