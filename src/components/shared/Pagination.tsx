import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TableCell, TableFooter } from "../ui/table";
import { useSearchParams } from "react-router-dom";

export function TablePagination({ metaString }: { metaString: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, totalPages, activePage, isHasPrevPage, isHasNextPage] =
    metaString.split("~");
  const [currentPage, setCurrentPage] = useState<number>(+activePage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= +totalPages) {
      setCurrentPage(page);
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
    }
  };

  const renderPaginationLinks = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(+totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(5, +totalPages);
    } else if (currentPage > +totalPages - 3) {
      startPage = Math.max(+totalPages - 4, 1);
    }

    const links = [];
    for (let page = startPage; page <= endPage; page++) {
      links.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            isActive={page === currentPage}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page);
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return links;
  };

  return (
    <TableFooter className="w-full">
      <TableCell colSpan={2}>
        <p className="text-muted-foreground">
          Showing from {(currentPage - 1) * 20 + 1} to{" "}
          {Math.min(+count, currentPage * 20)} of {count}
        </p>
      </TableCell>
      <TableCell colSpan={20}>
        <Pagination className="justify-end">
          <PaginationContent>
            {isHasPrevPage === "y" && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>
            )}
            {renderPaginationLinks()}

            {isHasNextPage === "y" && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </TableCell>
    </TableFooter>
  );
}
