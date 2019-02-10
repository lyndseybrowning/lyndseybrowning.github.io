import styled from 'styled-components';

export const PostListStyled = styled.ul`
    display: flex;
    flex-direction: column;
`;

export const PostListItemStyled = styled.li`
    cursor: pointer;
    padding: 1rem;
    margin-bottom: 1rem;
    border-bottom: 2px dotted lightgrey;

    &:hover {
        background-color: #f7f7f7;
    }
`;
