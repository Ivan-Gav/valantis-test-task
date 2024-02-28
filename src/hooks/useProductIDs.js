import { useEffect, useState } from "react";
import { getIDs } from "../api/api";

export default function useProductIDs() {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(null);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    getIDs()
      .then((result) => {
        const uniqueIds = [...new Set(result)];
        setIds(uniqueIds);
        console.log(`got ${uniqueIds.length} ids`);
      })
      .catch((error) => {
        console.log(error.message);
        setIsError(error);
      })
      .finally(() => setIsFetching(false));
  }, []);

  return { ids, isFetching, isError };
}
