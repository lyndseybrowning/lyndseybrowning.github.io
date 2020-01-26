import React from "react";
import PropTypes from "prop-types";
import { TagListStyled, TagStyled } from "./Tags.styled";

const Tags = ({ keywords }) => (
    <TagListStyled aria-label="keywords" data-testid="tags">
        {keywords.map(keyword => (
            <TagStyled key={keyword}>{keyword}</TagStyled>
        ))}
    </TagListStyled>
);

Tags.propTypes = {
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
