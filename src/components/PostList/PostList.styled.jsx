import styled from 'styled-components';

export const PostListStyled = styled.main`
    display: flex;
    flex-direction: column;
    list-style: none;
`;

export const PostListItemStyled = styled.article`
    margin-bottom: 1rem;

    .c-post__header {
    }

    .c-post__link {
        display: block;
        text-decoration: none;
        color: black;
    }
`;
