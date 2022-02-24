import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 50%;
  margin-left: 24px;
`;

export const Table = styled.table`
  width: 100%;
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
`;
