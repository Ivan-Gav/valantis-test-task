import { useCallback, useState } from "react";
import md5 from "md5";
import axios from "axios";
import getTimestamp from "../utils/getTimestamp";

const API_URL = "http://api.valantis.store:40000/";
const API_KEY = "Valantis";
const timestamp = getTimestamp();

export default function useAPI() {
  const [isFetching, setIsFetching] = useState(false);

  const getIDs = useCallback(async () => {
    try {
      const { data, status } = await axios.post(
        API_URL,
        {
          action: "get_ids",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth": md5(`${API_KEY}_${timestamp}`),
          },
        }
      );
      if (status !== 200) {
        throw new Error("API request failure");
      }
      return data.result;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getItems = useCallback(async (ids) => {
    setIsFetching(true);
    try {
      const { data, status } = await axios.post(
        API_URL,
        {
          action: "get_items",
          params: { ids: ids },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth": md5(`${API_KEY}_${timestamp}`),
          },
        }
      );
      if (status !== 200) {
        throw new Error("API request failure");
      }
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
