import { useEffect, useState } from "react";
import { getItems } from "../api/api"; 

export default function useProducts(ids) {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if ((ids !== undefined) && ids.length) {
      setIsFetching(true);
      getItems(ids)
        .then((result) => {
          setProducts(result);
        })
        .catch((error) => {
          console.log(error.message);
          setIsError(error);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [ids]);

  return { products, isFetching, isError };
}
