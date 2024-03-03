import md5 from "md5";
import axios from "axios";
import getTimestamp from "../utils/getTimestamp";

const API_URL = "https://api.valantis.store:41000/";
const API_KEY = "Valantis";
const timestamp = getTimestamp();

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
  try {
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
  } catch (error) {
    const output = error.response
      ? `${error.response.status}: ${error.response.data}`
      : error.message;
    console.log(`problem with fetching items: ${output}`);
    throw new Error(`problem with fetching items: ${output}`);
  }
};

export const getFields = async (field) => {
  try {
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

    // убрать дубликаты, цены сортировать по возрастанию, остальные - в алфавитном порядке,
    // для брендов добавить вариант "не указан"
    //
    const result =
      field === "price"
        ? [...new Set(data.result)].sort((a, b) => a - b)
        : field === "brand"
        ? [
            "не указан",
            ...[...new Set(data.result)].filter((item) => item !== null).sort(),
          ]
        : [...new Set(data.result)].sort();
    return result;
  } catch (error) {
    const output = error.response
      ? `${error.response.status}: ${error.response.data}`
      : error.message;
    console.log(`problem with fetching fields: ${output}`);
    throw new Error(`problem with fetching fields: ${output}`);
  }
};

export const getFilteredIDs = async (field, value) => {
  try {
    // сбросить фильтр если значение поиска не указано
    const reqField = value ? field : "product";

    // для цены тип "number" для остальных строка
    // бренд "не указан" соответствует null в ответе сервера
    const reqValue =
      reqField === "price"
        ? Number(value)
        : reqField === "brand" && value === "не указан"
        ? null
        : value;

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
  } catch (error) {
    const output = error.response
      ? `${error.response.status}: ${error.response.data}`
      : error.message;
    console.log(`problem with fetching ids: ${output}`);
    throw new Error(`problem with fetching ids: ${output}`);
  }
};

// "get_ids" не использовал, "filter" по продукту с пустым значением делает то же.
// export const getIDs = async () => {
//   const { data } = await axios.post(
//     API_URL,
//     {
//       action: "get_ids",
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "X-Auth": md5(`${API_KEY}_${timestamp}`),
//       },
//     }
//   );
//   return data.result;
// };
