import React, { useState } from "react";
import { PostListStyled } from "./PostList.styled";
import PostListItem from "./PostListItem";
import Pagination from "../Pagination";
import posts from "../../scripts/posts";

const totalPages = posts.length;

const PostList = () => {
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
