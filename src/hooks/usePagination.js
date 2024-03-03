import { useEffect, useState } from "react";

const QTY_PER_PAGE = 50;

export default function usePagination(ids) {
  const [page, setPage] = useState(1);
  const [idsToDisplay, setIdsToDisplay] = useState([]);
  const totalPages = Math.ceil(ids.length / QTY_PER_PAGE);

  useEffect(() => {
    if (!!ids && ids.length) {
      const idsToDisplay = ids.slice(
        (page - 1) * QTY_PER_PAGE,
        page * QTY_PER_PAGE
      );
      setIdsToDisplay(idsToDisplay);
    }
  }, [ids, page]);

  return { page, setPage, totalPages, idsToDisplay };
}
