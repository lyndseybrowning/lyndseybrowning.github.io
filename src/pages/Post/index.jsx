import React, { useMemo } from "react";

import posts from "scripts/posts";
import useDocumentTitle from "hooks/useDocumentTitle";
import PageNotFound from "pages/pageNotFound";
import PostStyled from "./Post.styled";

const findPostByUrl = url => {
    return posts.find(({ slug }) => slug === url);
};

const RenderedPost = ({ post }) => {
    useDocumentTitle(post.data.title);

    const postHtml = {
        __html: post.post,
    };

    return <PostStyled dangerouslySetInnerHTML={postHtml} />;
};

const Post = ({ match }) => {
    const post = useMemo(() => findPostByUrl(match.params.post), [
        match.params.post,
    ]);

    if (!post) {
        return <PageNotFound />;
    }

    return <RenderedPost post={post} />;
};

export default Post;
