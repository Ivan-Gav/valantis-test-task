import { useEffect, useState } from "react";

export default function Pagination(props) {
  const { page, totalPages, onPageChange } = props;
  const [currPage, setCurrPage] = useState(page);

  useEffect(() => {
    setCurrPage(page)
  }, [page])

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
    first: page < 2,
    prev: page < 2,
    next: page === totalPages,
    last: page === totalPages,
  };

  return (
    <div>
      <button disabled={disabled.first} onClick={() => onClick(1)}>
        First
      </button>
      <button disabled={disabled.prev} onClick={() => onClick(page - 1)}>
        Prev
      </button>

      <form onSubmit={onSubmit}>
        <input
          type="number"
          value={currPage}
          onChange={(e) => setCurrPage(e.target.value)}
        />
        <div>from {totalPages}</div>
      </form>

      <button disabled={disabled.next} onClick={() => onClick(page + 1)}>
        Next
      </button>
      <button disabled={disabled.last} onClick={() => onClick(totalPages)}>
        Last
      </button>
    </div>
  );
}
