import React, { useState } from "react";

import Pagination from "components/Pagination";
import posts from "scripts/posts";
import { APP_SUBTITLE } from "scripts/config";
import useDocumentTitle from "hooks/useDocumentTitle";
import { PostListStyled } from "./PostList.styled";
import PostListItem from "./PostListItem";

const totalPages = posts.length;

const PostList = () => {
    useDocumentTitle(APP_SUBTITLE);

    const [firstPage] = posts;
    const [currentPage, setCurrentPage] = useState(firstPage);

    return (
        <PostListStyled>
            {currentPage.map(({ data, slug }) => (
                <PostListItem key={data.title} data={data} slug={slug} />
            ))}
            <Pagination
                totalPages={totalPages}
                onActivePageChange={page => setCurrentPage(posts[page - 1])}
            />
        </PostListStyled>
    );
};

export default PostList;
