import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { theme } from "../GlobalStyle";

const ButtonStyled = styled.button`
    ${props =>
        props.selected &&
        css`
            background-color: ${theme.primaryColor};
            color: white;
        `}
`;

const Button = ({ children, disabled, selected, onClick }) => {
    return (
        <ButtonStyled disabled={disabled} selected={selected} onClick={onClick}>
            {children}
        </ButtonStyled>
    );
};

Button.defaultProps = {
    disabled: false,
    selected: false,
};

Button.propTypes = {
    children: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default Button;
