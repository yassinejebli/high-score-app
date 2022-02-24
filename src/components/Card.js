import styled from "@emotion/styled";

export default styled.div`
  padding: 32px;
  border-radius: 4px;
  background-color: white;
  width: ${(props) => (props.fullWidth ? "100%" : props.width)};

  box-shadow: rgb(0 0 0 / 10%) 0px 1px 1px 1px;
`;
