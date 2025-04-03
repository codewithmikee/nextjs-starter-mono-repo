import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/ui-components';
import { cn } from '@/lib/utils';
function QueryBasedPagination({ backendPagination, pagination, setPagination, totalFetchedRecords }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Extract current page from URL or backend response
    const [frontendPage, setFrontendPage] = useState(1);
    const backendPage = backendPagination.currentPage;
    const totalFrontendPages = Math.ceil(totalFetchedRecords / pagination.pageSize);
    useEffect(() => {
        const pageFromUrl = Number(searchParams.get('page')) || backendPage;
        setFrontendPage(pageFromUrl);
    }, [backendPage, searchParams]);
    // Update URL query parameter
    const updateUrlPage = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        router.replace(`?${params.toString()}`, { scroll: false });
    };
    // Handles Next/Prev (Triggers API Request)
    const handlePrev = () => {
        if (backendPagination.hasPrevPage) {
            updateUrlPage(backendPage - 1);
        }
    };
    const handleNext = () => {
        if (backendPagination.hasNextPage) {
            updateUrlPage(backendPage + 1);
        }
    };
    // Handles local frontend pagination within fetched records
    const handleLocalPageChange = (page) => {
        setFrontendPage(page);
        setPagination((prev) => ({
            ...prev,
            pageIndex: page - 1
        }));
    };
    // Generate Pagination Numbers
    const generatePaginationNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        if (totalFrontendPages <= maxVisiblePages) {
            for (let i = 1; i <= totalFrontendPages; i++) {
                pageNumbers.push(i);
            }
        }
        else {
            if (frontendPage > 3)
                pageNumbers.push(1, '...');
            const start = Math.max(2, frontendPage - 1);
            const end = Math.min(totalFrontendPages - 1, frontendPage + 1);
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }
            if (frontendPage < totalFrontendPages - 2)
                pageNumbers.push('...', totalFrontendPages);
        }
        return pageNumbers;
    };
    return (<Pagination>
      <PaginationContent>
        {/* Previous Button (Triggers API Request) */}
        <PaginationItem className={cn({
            'cursor-not-allowed text-muted-foreground': !backendPagination.hasPrevPage
        })}>
          <PaginationPrevious onClick={handlePrev} isActive={backendPagination.hasPrevPage}/>
        </PaginationItem>

        {/* Page Numbers (Switches Locally) */}
        {generatePaginationNumbers().map((page, index) => (<PaginationItem key={index}>
            {typeof page === 'number' ? (<PaginationLink onClick={() => handleLocalPageChange(page)} isActive={page === frontendPage}>
                {page}
              </PaginationLink>) : (<PaginationEllipsis />)}
          </PaginationItem>))}

        {/* Next Button (Triggers API Request) */}
        <PaginationItem>
          <PaginationNext className={cn({
            'cursor-not-allowed text-muted-foreground': !backendPagination.hasNextPage
        })} onClick={handleNext} isActive={backendPagination.hasNextPage}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>);
}
export default QueryBasedPagination;
