import { useState, useRef } from "react";
import { getFilteredIDs } from "../api/api";

export default function useFilter() {
  const [filteredIDs, setFilteredIDs] = useState([]);
  const [activeField, setActiveField] = useState("product");

  const abortRef = useRef(null);

  const filterIDs = async (field, value) => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setFilteredIDs([]);
    getFilteredIDs(field, value, abortRef)
      .then((data) => {
        // const data = [...new Set(result)];
        setFilteredIDs(data);
        console.log(`Result length ${data.length}`);
        return data;
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const resetFilter = () => {
    console.log('reset')
    abortRef.current?.abort();
    setFilteredIDs([]);
    setActiveField("product");
  };

  return { filteredIDs, filterIDs, activeField, setActiveField, resetFilter };
}
