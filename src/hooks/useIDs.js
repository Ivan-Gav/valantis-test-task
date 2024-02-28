import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFilteredIDs } from "../api/api";

export default function useIDs() {
  const [activeField, setActiveField] = useState("product");
  const [search, setSearch] = useState('');

  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getFilteredIDs(activeField, search),
    queryKey: ['ids'],
    onError: (err) => console.log(err.message)
  })

  useEffect(() => {
    if (data) {
      console.log(`fetched ${data.length} ids`)
    } else {
      console.log('ids undefined')
    }
    
  }, [data])

  // const resetFilter = () => {
  //   setActiveField("product");
  //   setSearch('');
  //   refetch();
  // };

  const ids = data || []

  return { ids, isLoading, activeField, setActiveField, search, setSearch, refetch };
}