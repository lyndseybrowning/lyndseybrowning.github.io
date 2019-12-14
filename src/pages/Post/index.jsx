import React from "react";

import posts from "scripts/posts";
import useDocumentTitle from "hooks/useDocumentTitle";
import PageNotFound from "pages/PageNotFound";
import PostStyled from "./Post.styled";

const findPostByUrl = url => {
    return posts.flat().find(({ slug }) => slug === url);
};

const Post = ({ match }) => {
    const post = findPostByUrl(match.params.post);

    if (!post) {
        return <PageNotFound />;
    }

    useDocumentTitle(post.data.title);

    const postHtml = {
        __html: post.post,
    };

    return <PostStyled dangerouslySetInnerHTML={postHtml} />;
};

export default Post;
