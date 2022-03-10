/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Table } from "./Leaderboard.css";
import isEqual from "lodash/isEqual";
import { getPositionByScore } from "./helpers";

function Leaderboard({ top10Scores }) {
  const isEmptyArray = top10Scores.length === 0;
  // console.log({
  //   getPositionByScore: getPositionByScore.cache,
  // });
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
          top10Scores.map((score) => (
            <tr key={score.name}>
              <td>{getPositionByScore(score.name, top10Scores)}</td>
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

// Re-render Leaderboard table only when top10Scores is updated
export default React.memo(Leaderboard, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});
