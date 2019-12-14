import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { PAGINATION_ACTIVE_PAGE_RANGE } from "scripts/config";
import Button from "./Button";
import ActivePageRange from "./ActivePageRange";

const getStartAndEndPage = (activePageRange, currentPage, totalPages) => {
    const medianPageRange = Math.floor(activePageRange / 2);
    const lowerPageRange = currentPage - medianPageRange;
    const upperPageRange = currentPage + medianPageRange;

    return {
        startPage: lowerPageRange < 1 ? 1 : lowerPageRange,
        endPage: upperPageRange > totalPages ? totalPages : upperPageRange,
    };
};

const Pagination = props => {
    const {
        totalPages,
        activePage,
        activePageRange,
        onActivePageChange,
    } = props;

    const [currentPage, setCurrentPage] = useState(activePage);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const { startPage, endPage } = useMemo(
        () => getStartAndEndPage(activePageRange, currentPage, totalPages),
        [currentPage],
    );

    useEffect(() => {
        onActivePageChange(currentPage);
    }, [currentPage]);

    const setFirstPage = () => setCurrentPage(1);
    const setNextPage = () => setCurrentPage(currentPage + 1);
    const setPreviousPage = () => setCurrentPage(currentPage - 1);
    const setLastPage = () => setCurrentPage(totalPages);

    return (
        <div>
            <Button onClick={setFirstPage}>First Page</Button>
            <Button disabled={isFirstPage} onClick={setPreviousPage}>
                Previous Page
            </Button>
            <ActivePageRange
                startPage={startPage}
                endPage={endPage}
                currentPage={currentPage}
                onPageClick={page => setCurrentPage(page)}
            />
            <Button disabled={isLastPage} onClick={setNextPage}>
                Next Page
            </Button>
            <Button onClick={setLastPage}>Last Page</Button>
        </div>
    );
};

Pagination.defaultProps = {
    activePage: 1,
    activePageRange: PAGINATION_ACTIVE_PAGE_RANGE,
};

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    activePage: PropTypes.number,
    activePageRange: PropTypes.number,
};

export default Pagination;
