import { styled } from "styled-components";

export const DIV = styled.div`
background:url(${props => props.bg}), url(${props => props.bg}) no-repeat;
background-color:gray;
background-blend-mode: color-burn; 
background-size: cover;
` 