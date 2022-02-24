import React from "react";
import { Main } from "./HighScoreApp.css";
import { getScores } from "./api";
import Form from "./containers/form/Form";
import Leaderboard from "./containers/leader-board/Leaderboard";
import Button from "./components/Button";

function HighScoreApp() {
  const [scoresData, setScoresData] = React.useState({});
  const [sortingField, setSortingField] = React.useState("totalPoints");
  const top10Scores = React.useMemo(
    () =>
      Object.entries(scoresData)
        .map(([_, value]) => ({
          ...value,
          // maybe it's better to memoize this calculation by caching the results
          avgScorePerClick: value.totalPoints / value.clicks,
        }))
        .sort((a, b) => b[sortingField] - a[sortingField])
        .slice(0, 10),
    [scoresData, sortingField]
  );

  // For faster updates, I used object/map (map[<name>]: {{<clicks>, <totalPoints>...}}), name as a key
  React.useEffect(() => {
    getScores().then((data) =>
      setScoresData(data.reduce((a, v) => ({ ...a, [v.name]: v }), {}))
    );
  }, []);

  const addScoreHandler = React.useCallback(
    (data) => {
      if (scoresData[data.name]) {
        const newScoresData = { ...scoresData };
        newScoresData[data.name].totalPoints += data.totalPoints;
        newScoresData[data.name].clicks += data.clicks;
        setScoresData(newScoresData);
      } else {
        setScoresData({ ...scoresData, [data.name]: data });
      }
    },
    [scoresData]
  );

  return (
    <Main>
      <Form addScore={addScoreHandler} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          onClick={() =>
            setSortingField(
              sortingField === "totalPoints"
                ? "avgScorePerClick"
                : "totalPoints"
            )
          }
        >
          {sortingField === "totalPoints"
            ? "Sort by Average points per click"
            : "Sort by points"}
        </Button>
        <Leaderboard top10Scores={top10Scores} />
      </div>
    </Main>
  );
}

export default HighScoreApp;
