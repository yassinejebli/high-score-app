import styled from "@emotion/styled";

export const Table = styled.table`
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;
  border-collapse: collapse;
  & th {
    padding-bottom: 10px;
  }
  & thead {
    text-align: left;
  }
  & td {
    border-top: 1px solid rgb(233, 233, 233);
  }

  & td,
  & th {
    padding: 16px;
  }

  & tbody tr:hover {
    background-color: rgb(243, 243, 243);
  }

  @media (max-width: 768px) {
    & td,
    & th {
      padding: 4px;
    }
  }
`;
