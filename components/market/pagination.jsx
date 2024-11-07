import React, { useState, useMemo, useEffect } from "react";
import useIsMobile from "../hooks/us-is-mobile";
export default function Pagination({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
  setCurrentPage,
}) {
  const isMobile = useIsMobile();
  const [visibleButtons, setvisibleButtons] = useState(8);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visiblePages = useMemo(() => {
    const pages = [];
    const half = Math.floor(visibleButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, visibleButtons);
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - visibleButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages, visibleButtons]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };
  useEffect(() => {
    setvisibleButtons(isMobile ? 3 : 8);
  }, [isMobile]);

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
