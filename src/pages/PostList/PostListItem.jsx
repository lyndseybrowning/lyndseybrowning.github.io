import React from "react";
import { PostListItemStyled } from "./PostList.styled";
import Tags from "../../components/Tags";
import { Link } from "react-router-dom";

const PostListItem = ({ data, slug }) => {
    return (
        <PostListItemStyled className="c-post">
            <header className="c-post__header">
                <Link to={`/posts/${slug}`} className="c-post__link">
                    <h3>{data.title}</h3>
                </Link>
                <Tags keywords={data.keywords} />
                <time>{data.date}</time>
            </header>
            <p>{data.description}</p>
        </PostListItemStyled>
    );
};

export default PostListItem;
