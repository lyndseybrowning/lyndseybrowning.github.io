import { createGlobalStyle } from "styled-components";

const theme = {
    primaryFontColor: "#313639",
    primaryColor: "#ff004f",
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

    .o-wrapper {
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
    }
`;

export { theme };
export default GlobalStyle;
