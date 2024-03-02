import { useEffect, useState } from "react";
import s from "./Pagination.module.css";

const Prev = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 20 20"
    >
      <path fill="currentColor" d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z" />
    </svg>
  );
};

const Next = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 20 20"
    >
      <path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z" />
    </svg>
  );
};

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
