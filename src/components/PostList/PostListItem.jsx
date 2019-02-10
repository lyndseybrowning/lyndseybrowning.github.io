import React from 'react';
import { PostListItemStyled } from './PostList.styled';
import Tags from '../Tags';

const PostListItem = ({ data }) => {
    return (
        <PostListItemStyled>
            <h2>{data.title}</h2>
            <Tags keywords={data.keywords} />
            <time>{data.date}</time>
            <p>{data.description}</p>
        </PostListItemStyled>
    );
};

export default PostListItem;
