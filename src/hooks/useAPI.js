import { useCallback, useState } from "react";
import md5 from "md5";

const API_URL = "http://api.valantis.store:40000/";
const API_KEY = "Valantis";

export default function useAPI() {
  const [isFetching, setIsFetching] = useState(false);

  const getIDs = useCallback(async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": md5(`${API_KEY}_20240226`),
        },
        body: JSON.stringify({
          action: "get_ids",
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

  const getItems = useCallback(async (ids) => {
    setIsFetching(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": md5(`${API_KEY}_20240226`),
        },
        body: JSON.stringify({
          action: "get_items",
          params: { ids: ids },
        }),
      });
      if (!response.ok) {
        throw new Error("API request failure");
      }
      const data = await response.json();
      // filter dublicated ids
      const result = data.result;
      let filteredResult = [];
      if (result.length > ids.length) {
        const set = new Set();
        result.forEach((item) => set.add(item.id));
        result.forEach((item) => {
          if (set.has(item.id)) {
            set.delete(item.id);
            filteredResult.push(item);
          }
        });
      } else {
        filteredResult = result;
      }
      //--------------------------
      console.log(filteredResult);
      setIsFetching(false);
      return filteredResult;
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  }, []);

  return { getIDs, getItems, isFetching };
}
