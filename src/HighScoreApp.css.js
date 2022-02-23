import styled from "@emotion/styled";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// if score < 0 red else green
export const Score = styled.div`
  font-size: 30px;
  color: ${(props) => (props.score < 0 ? "red" : "green")};
`;
