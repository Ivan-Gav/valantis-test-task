import { useEffect, useState, useRef } from "react";
import { getIDs, getFilteredIDs } from "../api/api";

export default function useIDs() {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(null);
  const [ids, setIds] = useState([]);
  const [activeField, setActiveField] = useState("product");
  const [filterOn, setFilterOn] = useState(false);

  const abortRef = useRef(null);

  useEffect(() => {
    if (!filterOn) {
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
    }

  }, [filterOn]);

  const filterIDs = async (field, value) => {
    setFilterOn(true);
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setIds([]);
    getFilteredIDs(field, value, abortRef)
      .then((result) => {
        const data = [...new Set(result)];
        setIds(data);
        console.log(`Result length ${data.length}`);
        return data;
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const resetFilter = () => {
    console.log("reset");
    abortRef.current?.abort();
    setIds([]);
    setActiveField("product");
    setFilterOn(false);
  };

  return { ids, isFetching, isError, filterIDs, activeField, setActiveField, resetFilter, filterOn };
}