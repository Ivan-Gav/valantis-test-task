import md5 from "md5";
import axios from "axios";
import getTimestamp from "../utils/getTimestamp";

const API_URL = "http://api.valantis.store:40000/";
const API_KEY = "Valantis";
const timestamp = getTimestamp();

export const getIDs = async () => {
  const { data } = await axios.post(
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
  return data.result;
};

const getFilteredIdDublicates = (data, length) => {
  let filtered = [];
  if (data && data.length > length) {
    const set = new Set();
    data.forEach((item) => set.add(item.id));
    data.forEach((item) => {
      if (set.has(item.id)) {
        set.delete(item.id);
        filtered.push(item);
      }
    });
  } else {
    filtered = data;
  }
  return filtered;
};

export const getItems = async (ids) => {
  const { data } = await axios.post(
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
  const result = getFilteredIdDublicates(data.result, ids.length);
  console.log(`Got ${result.length} products`);
  return result;
};