import { css } from "@emotion/react";
import styled from "@emotion/styled";

export default styled.input`
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 8px;
  border-radius: 4px;
  outline: none;
  transition: all 0.15s linear 0s;
  border: 1px solid rgb(233, 233, 233);

  &:focus {
    box-shadow: rgb(167 209 237) 0px 0px 1px 2px;
  }

  ${(props) =>
    props.error &&
    css`
      border-color: rgb(212, 94, 94);
      &:focus {
        box-shadow: rgb(247 232 232) 0px 0px 1px 2px;
      }
    `};
`;
