import styled from "@emotion/styled";

// TODO: create a constant for screen sizes ("xs": 0, "sm": 576, "md": 768,...)
export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

export const TableWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;
