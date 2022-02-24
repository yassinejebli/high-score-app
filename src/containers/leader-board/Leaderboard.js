import React from "react";
import { Table, Wrapper } from "./Leaderboard.css";

export default function LeaderBoard({ top10Scores }) {
  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th style={{ textAlign: "right" }}>Score</th>
            <th style={{ textAlign: "right" }}>Clicks</th>
            <th style={{ textAlign: "right" }}>Average score/click</th>
          </tr>
        </thead>
        <tbody>
          {top10Scores.map((score, index) => (
            <tr key={score.name}>
              <td>{index + 1}</td>
              <td>{score.name}</td>
              <td style={{ textAlign: "right" }}>{score.totalPoints}</td>
              <td style={{ textAlign: "right" }}>{score.clicks}</td>
              <td style={{ textAlign: "right" }}></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}
