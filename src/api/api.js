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
  return result;
};

export const getFields = async (field) => {
  const { data } = await axios.post(
    API_URL,
    {
      action: "get_fields",
      params: { field: field },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Auth": md5(`${API_KEY}_${timestamp}`),
      },
    }
  );
  const result =
    typeof data.result[0] === "number"
      ? [...new Set(data.result)].sort((a, b) => a - b)
      : [...new Set(data.result)].sort();
  return result;
};

export const getFilteredIDs = async (field, value) => {
  const reqField = value ? field : "product";
  const reqValue = field !== "product" && !isNaN(value) && Number(value) !== 0 ? Number(value) : value;

  const { data } = await axios.post(
    API_URL,
    {
      action: "filter",
      params: { [reqField]: reqValue },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Auth": md5(`${API_KEY}_${timestamp}`),
      },
    }
  );
  const result = [...new Set(data.result)];
  return result;
};
