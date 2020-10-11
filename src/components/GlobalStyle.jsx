import { createGlobalStyle } from "styled-components";

const theme = {
    primaryColor: "#bd013b",
    primaryColorDark: "#ff0041",
    primaryFontColor: "#313639",
};

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 67.5%;
    }

    body {
        font-size: 1.6rem;
        font-family: 'Alegreya Sans';
        color: ${theme.primaryFontColor};
    }

    ul {
        padding-left: 0;
    }

    h1, h2 {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    a {
        color: ${theme.primaryColor};

        :hover {
            color: ${theme.primaryColorDark};
        }
    }

    .o-wrapper {
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;
        padding-top: 2rem;

        &__title {
            a {
                text-decoration: none;
            }
        }

        &__photo {
            max-width: 10rem;
            border-radius: 100%;
        }
    }
`;

export { theme };
export default GlobalStyle;
