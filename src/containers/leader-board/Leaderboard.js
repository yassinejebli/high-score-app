/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Table } from "./Leaderboard.css";

export default function LeaderBoard({ top10Scores }) {
  const isEmptyArray = top10Scores.length === 0;
  return (
    <Table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th
            css={css`
              text-align: right;
            `}
          >
            Points
          </th>
          <th
            css={css`
              text-align: right;
            `}
          >
            Clicks
          </th>
          <th
            css={css`
              text-align: right;
            `}
          >
            Average points/click
          </th>
        </tr>
      </thead>
      <tbody>
        {!isEmptyArray ? (
          top10Scores.map((score, index) => (
            <tr key={score.name}>
              <td>{index + 1}</td>
              <td>{score.name}</td>
              <td
                css={css`
                  text-align: right;
                `}
              >
                {score.totalPoints}
              </td>
              <td
                css={css`
                  text-align: right;
                `}
              >
                {score.clicks}
              </td>
              <td
                css={css`
                  text-align: right;
                `}
              >
                {score.avgScorePerClick.toFixed(2)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={5}
              css={css`
                text-align: center;
              `}
            >
              No Data
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
