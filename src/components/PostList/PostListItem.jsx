import React from 'react';
import { PostListItemStyled } from './PostList.styled';
import Tags from '../Tags';
import { Link } from 'react-router-dom';

const PostListItem = ({ data, slug }) => {
    return (
        <PostListItemStyled>
            <Link to={`/posts/${slug}`}>
                <h2>{data.title}</h2>
            </Link>
            <Tags keywords={data.keywords} />
            <time>{data.date}</time>
            <p>{data.description}</p>
        </PostListItemStyled>
    );
};

export default PostListItem;
