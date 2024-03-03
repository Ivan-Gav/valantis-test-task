import { useEffect, useState } from "react";
import s from "./Pagination.module.css";

import Prev from "../../ui/SVG/PrevSVG";
import Next from "../../ui/SVG/NextSVG";

export default function Pagination(props) {
  const { page, totalPages, onPageChange, isLoading } = props;
  const [currPage, setCurrPage] = useState(page);

  useEffect(() => {
    setCurrPage(page);
  }, [page]);

  const onClick = (page) => {
    onPageChange(Number(page));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const value = Number(currPage);
    if (value > 0 && value <= totalPages && Number.isInteger(value)) {
      onPageChange(value);
    } else {
      console.log("Invalid value");
    }
  };

  const disabled = {
    first: page < 2 || isLoading,
    prev: page < 2 || isLoading,
    next: page === totalPages || isLoading,
    last: page === totalPages || isLoading,
  };

  return (
    <div className={s.pagination_container}>
      <button className={s.pagination_btn} disabled={disabled.first} onClick={() => onClick(1)}>
        1
      </button>
      <button className={s.pagination_btn} disabled={disabled.prev} onClick={() => onClick(page - 1)}>
        <Prev />
      </button>

      <form className={s.pagination_curr_page} onSubmit={onSubmit}>
        <input
          className={s.pagination_page}
          id="current_page"
          name="current_page"
          type="number"
          title="ввести страницу"
          min={1}
          max={totalPages}
          step={1}
          value={currPage}
          onChange={(e) => setCurrPage(e.target.value)}
          disabled={isLoading}
        />
      </form>

      <button className={s.pagination_btn} disabled={disabled.next} onClick={() => onClick(page + 1)}>
        <Next />
      </button>
      <button className={s.pagination_btn} disabled={disabled.last} onClick={() => onClick(totalPages)}>
        {totalPages}
      </button>
    </div>
  );
}
