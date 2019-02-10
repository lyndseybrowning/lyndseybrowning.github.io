import React from 'react';
import { TagListStyled, TagStyled } from './Tags.styled';

const Tags = ({ keywords }) => (
    <TagListStyled aria-label="keywords">
        {keywords.map(keyword => (
            <TagStyled key={keyword}>{keyword}</TagStyled>
        ))}
    </TagListStyled>
);

export default Tags;
