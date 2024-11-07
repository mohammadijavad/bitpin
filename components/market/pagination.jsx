import React, { useState, useMemo } from "react";

export default function Pagination({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const visiblePages = useMemo(() => {
    const pages = [];
    const maxVisibleButtons = 8;
    const half = Math.floor(maxVisibleButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisibleButtons);
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxVisibleButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className="mt-4 w-full flex items-center justify-center select-none">
      <div>
        {currentPage !== 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-12 h-10 rounded-md border border-white-taupe mx-2"
          >
            قبلی
          </button>
        )}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={
              currentPage === page
                ? "w-12 h-10 rounded-md border border-white-taupe mx-2 bg-green-light"
                : "w-12 h-10 rounded-md border border-white-taupe mx-2"
            }
          >
            {page}
          </button>
        ))}
        {currentPage !== totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-12 h-10 rounded-md border border-white-taupe mx-2"
          >
            بعدی
          </button>
        )}
      </div>
    </div>
  );
}
