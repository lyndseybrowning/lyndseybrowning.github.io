import React from "react";

import posts from "scripts/posts";
import { APP_SUBTITLE } from "scripts/config";
import useDocumentTitle from "hooks/useDocumentTitle";
import { PostListStyled } from "./PostList.styled";
import PostListItem from "./PostListItem";

const PostList = () => {
    useDocumentTitle(APP_SUBTITLE);

    return (
        <PostListStyled>
            {posts.map(({ data, slug }) => (
                <PostListItem key={data.title} data={data} slug={slug} />
            ))}
        </PostListStyled>
    );
};

export default PostList;
