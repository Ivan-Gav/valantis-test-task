import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFilteredIDs } from "../api/api";

export default function useIDs() {
  const [activeField, setActiveField] = useState("product");
  const [search, setSearch] = useState('');

  const { data, isLoading, refetch, error } = useQuery({
    queryFn: () => getFilteredIDs(activeField, search),
    queryKey: ['ids'],
  })

  useEffect(() => {
    if (error) {
      console.log(`К сожалению после нескольких попыток загрузки ошибка остается: ${error.message}`)
    }
  }, [error])

  const ids = data || []

  return { ids, isLoading, activeField, setActiveField, search, setSearch, refetch };
}