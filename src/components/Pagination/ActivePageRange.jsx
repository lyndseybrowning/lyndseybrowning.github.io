import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const ActivePageRange = ({ currentPage, startPage, endPage, onPageClick }) => {
    const createPageRange = () => {
        const pages = [];

        for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
            const text = `Page ${pageNumber}`;
            const selected = currentPage === pageNumber;

            pages.push(
                <Button
                    key={text}
                    selected={selected}
                    onClick={() => onPageClick(pageNumber)}
                >
                    {text}
                </Button>,
            );
        }

        return pages;
    };

    return createPageRange();
};

ActivePageRange.propTypes = {
    currentPage: PropTypes.number.isRequired,
    startPage: PropTypes.number.isRequired,
    endPage: PropTypes.number.isRequired,
    onPageClick: PropTypes.func.isRequired,
};

export default ActivePageRange;
