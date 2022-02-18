import React, { useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface Props {
  searchText: any;
  pageNo: any;
  perPage: any;
  totalPage: any;
}

const PaginationComponent: React.FC<Props> = ({
  searchText,
  pageNo,
  perPage,
  totalPage,
}) => {
  const createLinkByPageNo = (searchText: any, pageNo: any, perPage: any) => {
    return `?q=${searchText}&pageNo=${pageNo - 1}&perPage=${perPage}`;
  };
  useEffect(() => {}, [searchText, pageNo, perPage, totalPage]);

  return (
    <Pagination size='lg'>
      <PaginationItem disabled={Number(pageNo) === 1}>
        <PaginationLink
          previous
          href={createLinkByPageNo(searchText, pageNo, perPage)}
        />
      </PaginationItem>
      {Array.from(Array(2)).map((item: any, index: any) => (
        <PaginationItem key={index}>
          <PaginationLink
            href={`?q=${searchText}&pageNo=${index + 1}&perPage=${perPage}`}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink href='#'>..</PaginationLink>
      </PaginationItem>

      <PaginationItem disabled={pageNo === totalPage}>
        <PaginationLink
          next
          href={`?q=${searchText}&pageNo=${pageNo + 1}&perPage=${perPage}`}
        />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
