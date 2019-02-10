import React from 'react';
import { PostListStyled } from './PostList.styled';
import PostListItem from './PostListItem';

const PostList = ({ posts }) => (
    <PostListStyled>
        {posts.map(({ data }) => {
            return <PostListItem key={data.title} data={data} />;
        })}
    </PostListStyled>
);

export default PostList;
