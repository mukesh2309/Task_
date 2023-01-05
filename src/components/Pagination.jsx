import React from "react";

function Pagination({ totalRows, rowsPerPage, setCurrentPage }) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div
      style={{
        borderRadius: 12,
      }}
    >
      {pages.map((page, index) => {
        return (
          <button
            style={{
              cursor: "pointer",
              padding: "6px 12px",
              border: "none",
              outline: "none",
            }}
            onClick={() => setCurrentPage(page)}
            key={index}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
