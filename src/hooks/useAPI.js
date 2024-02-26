import { useCallback } from "react";
import md5 from "md5";

const API_URL = "http://api.valantis.store:40000/";
const API_KEY = "Valantis";

export default function useAPI() {
  const getIDs = useCallback(async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "X-Auth": md5(`${API_KEY}_20240226`),
        },
        body: JSON.stringify({
          "action": "get_ids",
        }),
      });
      if (!response.ok) {
        throw new Error("API request failure");
      }
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { getIDs };
}
