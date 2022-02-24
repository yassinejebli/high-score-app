import { render, screen } from "@testing-library/react";
import Leaderboard from "./Leaderboard";

const top10ScoresMock = [
  {
    name: "Jane Doe",
    totalPoints: 157,
    clicks: 5,
    avgScorePerClick: 157 / 5,
  },
  {
    name: "Lily Allen",
    totalPoints: 234,
    clicks: 8,
    avgScorePerClick: 234 / 8,
  },
  {
    name: "John Smith",
    totalPoints: 390,
    clicks: 10,
    avgScorePerClick: 390 / 10,
  },
  {
    name: "David Cortez",
    totalPoints: 101,
    clicks: 3,
    avgScorePerClick: 101 / 3,
  },
  {
    name: "Allan Moon",
    totalPoints: 102,
    clicks: 5,
    avgScorePerClick: 102 / 5,
  },
];

describe("Leaderboard", () => {
  it("shows 'No Data' when the table is empty", () => {
    render(<Leaderboard top10Scores={[]} />);
    expect(screen.getByText("No Data")).toBeInTheDocument();
  });

  it("shows n rows", () => {
    render(<Leaderboard top10Scores={top10ScoresMock} />);
    expect(screen.queryAllByRole("row")).toHaveLength(
      top10ScoresMock.length + 1
    ); // + 1: header row
  });
});
