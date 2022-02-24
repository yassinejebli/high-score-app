import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 50%;
`;

export const Score = styled.div`
  font-size: 30px;
  margin-left: 6px;
  color: ${(props) => (props.score < 0 ? "red" : "green")};
`;

export const Flex = styled.div`
  display: flex;
  margin: 8px 0;
`;
