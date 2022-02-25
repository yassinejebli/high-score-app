import styled from "@emotion/styled";
import Card from "../../components/Card";

export const Wrapper = styled(Card)`
  width: 500px;
  flex-direction: column;
  display: flex;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Score = styled.div`
  font-size: 2rem;
  margin-left: 6px;
  color: ${(props) => (props.score < 0 ? "red" : "green")};
`;

export const Flex = styled.div`
  display: flex;
  margin: 8px 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
