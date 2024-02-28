import { useQuery } from "@tanstack/react-query";
import { getFields } from "../api/api";

export default function useFields(field) {

  const { data: fields } = useQuery({
    queryFn: () => getFields(field),
    queryKey: ['fields', field],
    staleTime: Infinity,
  })

  return { fields };
}
