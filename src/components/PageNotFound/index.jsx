import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageNotFoundStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 2rem;
`;

const PageNotFound = () => {
    useEffect(() => {
        document.title = '404: Page not found';
    });

    return (
        <PageNotFoundStyled>
            <p>
                <strong>404</strong>: The page you requested cannot be found.
            </p>
            <p>
                <Link to="/">Go back to the home page</Link>
            </p>
        </PageNotFoundStyled>
    );
};

export default PageNotFound;
