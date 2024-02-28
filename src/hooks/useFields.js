import { useEffect, useState, useRef } from "react";
import { getFields } from "../api/api";

export default function useFields(field) {
  const [fields, setFields] = useState([]);
  const cache = useRef({});

  // TODO do proper caching
  useEffect(() => {
    setFields([]);
    if (cache[field]) {
      setFields(cache[field]);
    } else {
      getFields(field)
        .then((result) => {
          const data =
            typeof result[0] === "number"
              ? [...new Set(result)].sort((a, b) => a - b)
              : [...new Set(result)].sort();
          setFields(data);
          cache[field] = data;
          console.log(`Result length ${data.length}`);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, [field]);

  return { fields };
}
