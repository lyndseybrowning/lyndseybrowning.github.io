import React from "react";
import PageNotFound from "../PageNotFound";
import PostStyled from "./Post.styled";
import posts from "../../scripts/posts";

const Post = ({ match }) => {
    const post = posts.find(post => post.slug === match.params.post);

    if (!post) {
        return <PageNotFound />;
    }

    const postHtml = {
        __html: post.post,
    };

    return <PostStyled dangerouslySetInnerHTML={postHtml} />;
};

export default Post;
