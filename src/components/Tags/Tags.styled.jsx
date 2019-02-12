import styled from 'styled-components';

export const TagListStyled = styled.ul`
    list-style: none;
    display: flex;
`;

export const TagStyled = styled.li`
    padding: 0.25rem;
    background-color: ${props => props.theme.primaryColor};
    color: white;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
`;
