// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../api/api"; 

export default function useProducts(ids) {

  const { data, isLoading } = useQuery({
    queryFn: () => getItems(ids),
    queryKey: ['products', ids]
  })

  const products = data || [];

  return { products, isLoading };
}
