import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "./Pagination.css";
interface Props {
  onPageChange: any;
  totalCount: any;
  siblingCount: any;
  currentPage: any;
  pageSize: any;
  className: any;
}
const Pagination: React.FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`pagination-container m-0 mx-3 ${className}`}>
      <li
        className={currentPage === 1 ? "pagination-item" : "disabled"}
        onClick={onPrevious}
      >
        <div className='arrow left' />
      </li>
      {paginationRange.map((pageNumber: any, index: any) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={`pageNumber/${index}`} className='pagination-item dots'>
              {" "}
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={index + pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={
          currentPage === lastPage
            ? "pagination-item"
            : "pagination-item disabled"
        }
        onClick={onNext}
      >
        <div className='arrow right' />
      </li>
    </ul>
  );
};

export default Pagination;
