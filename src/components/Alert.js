import { css } from "@emotion/react";
import styled from "@emotion/styled";

export default styled.div`
  padding: 8px;
  width: 100%;
  border-radius: 4px;

  //default
  background-color: white;
  border: 1px solid rgb(233, 233, 233);
  color: black;

  ${(props) =>
    props.variant === "success" &&
    css`
      color: rgb(89, 173, 4);
      background-color: rgb(242, 250, 235);
      border-color: rgb(153, 212, 94);
    `}

  ${(props) =>
    props.variant === "warning" &&
    css`
      color: rgb(220, 166, 26);
      background-color: rgb(255, 249, 232);
      border-color: rgb(255, 192, 29);
    `}

    ${(props) =>
    props.variant === "info" &&
    css`
      color: rgb(36, 139, 210);
      background-color: rgb(220, 236, 248);
      border-color: rgb(80, 162, 219);
    `}

    ${(props) =>
    props.variant === "error" &&
    css`
      color: rgb(179, 27, 27);
      background-color: rgb(247, 232, 232);
      border-color: rgb(212, 94, 94);
    `}
`;
