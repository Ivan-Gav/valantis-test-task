import { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getFields } from "../api/api";

export default function useFields(field) {

  const { data: fields, error } = useQuery({
    queryFn: () => getFields(field),
    queryKey: ['fields', field],
    staleTime: Infinity,
  })

  useEffect(() => {
    if (error) {
      console.log(`К сожалению после нескольких попыток загрузки ошибка остается: ${error.message}`)
    }
  }, [error])

  return { fields };
}
