import React from 'react';
import { PostListStyled } from './PostList.styled';
import PostListItem from './PostListItem';
import posts from '../../scripts/posts';

const PostList = () => (
    <PostListStyled>
        {posts.map(({ data, slug }) => {
            return <PostListItem key={data.title} data={data} slug={slug} />;
        })}
    </PostListStyled>
);

export default PostList;
