import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../api/api"; 

export default function useProducts(ids) {

  const { data, isLoading, error } = useQuery({
    queryFn: () => getItems(ids),
    queryKey: ['products', ids]
  })

  useEffect(() => {
    if (error) {
      console.log(`К сожалению, после нескольких попыток загрузки ошибка остается: ${error.message}`)
    }
  }, [error])

  const products = data || [];

  return { products, isLoading };
}
