import React from "react";
import PageNotFound from "../PageNotFound";
import PostStyled from "./Post.styled";
import posts from "../../scripts/posts";

const findPostByUrl = url => {
    return posts.flat().find(({ slug }) => slug === url);
};

const Post = ({ match }) => {
    const post = findPostByUrl(match.params.post);

    if (!post) {
        return <PageNotFound />;
    }

    const postHtml = {
        __html: post.post,
    };

    return <PostStyled dangerouslySetInnerHTML={postHtml} />;
};

export default Post;
