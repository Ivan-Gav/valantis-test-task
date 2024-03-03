import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import s from "./CatalogPage.module.css";
import Pagination from "../components/Pagination/Pagination";
import ProductList from "../components/ProductList/ProductList";
import useIDs from "../hooks/useIDs";

import usePagination from "../hooks/usePagination";
import useProducts from "../hooks/useProducts";
import ProductFilter from "../components/ProductFilter/ProductFilter";
import FilterTags from "../components/ProductFilter/FilterTags";
import Loading from "../ui/Loading/Loading";

function CatalogPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    ids,
    isLoading: isIDsFetching,
    activeField,
    setActiveField,
    search,
    setSearch,
    filterBy,
    setFilterBy,
    refetch,
  } = useIDs();
  const { page, setPage, totalPages, idsToDisplay } = usePagination(ids);
  const { products, isLoading } = useProducts(idsToDisplay);

  const display = {
    loader: isIDsFetching || isLoading,
    products:
      !(isIDsFetching || isLoading) && !!ids.length && !!products.length,
    notFound:
      !(isIDsFetching || isLoading) && (!ids.length || !products.length),
    pagination: !isIDsFetching && totalPages > 1,
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  const clearFilter = () => {
    setFilterBy("");
    setActiveField("product");
    setSearch("");
    refetch();
  };

  const filterProps = {
    activeField,
    setActiveField,
    search,
    setSearch,
    setFilterBy,
    refetch,
    setPage,
    closeDrawer,
  };

  const NotFound = () => {
    return (
      <>
        <h2>Товары не найдены</h2>
        <p>Попробуйте изменить параметры поиска</p>
      </>
    );
  };

  return (
    <main className={s.page}>
      <h1>Valantis Test Task</h1>
      <FilterTags
        onFilterClick={() => setIsDrawerOpen(true)}
        onClearClick={clearFilter}
        filterBy={filterBy}
      />
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        direction="left"
        size="auto"
        lockBackgroundScroll={true}
      >
        <ProductFilter {...filterProps} />
      </Drawer>
      {display.loader && <Loading />}
      {display.notFound && <NotFound />}
      {display.products && <ProductList ids={products} />}
      {display.pagination && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      )}
    </main>
  );
}

export default CatalogPage;
