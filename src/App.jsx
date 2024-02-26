import { useEffect, useState } from "react";
import "./App.css";
import useAPI from "./hooks/useAPI";
import Pagination from "./components/Pagination/Pagination";

const QTY_PER_PAGE = 50;

function App() {
  const [ids, setIds] = useState([]);
  const [page, setPage] = useState(1);

  const { getIDs } = useAPI();

  useEffect(() => {
    getIDs().then((result) => {
      const uniqueIds = [...new Set(result)];
      setIds(uniqueIds);
      console.log(`got ${uniqueIds.length} ids`);
    });
  }, [getIDs]);

  const onPageChange = (page) => {
    setPage(page);
    console.log(`go to ${page}`);
  };

  const totalPages = Math.ceil(ids.length / QTY_PER_PAGE);

  return (
    <>
      <h1>Hello Valantis!</h1>
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

export default App;
