import styled from "styled-components";

export const PostListStyled = styled.main`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

export const PostListItemStyled = styled.article`
    margin-bottom: 1rem;
    margin-right: 1%;
    padding-left: 1rem;
    padding-right: 1rem;
    box-sizing: border-box;
    min-width: 49%;
    border: 0.1rem solid #e3e2de;
    border-radius: 1rem;

    .c-post__header {
    }

    .c-post__link {
        text-decoration: none;
    }
`;
