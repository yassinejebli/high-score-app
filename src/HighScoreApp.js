import React from "react";
import { Main, TableWrapper } from "./HighScoreApp.css";
import { getScores } from "./api";
import Form from "./containers/form/Form";
import Leaderboard from "./containers/leader-board/Leaderboard";
import Button from "./components/Button";

function HighScoreApp() {
  const [scoresData, setScoresData] = React.useState({});
  const [isFetchingData, setIsFetchingData] = React.useState(false);
  const [sortingField, setSortingField] = React.useState("totalPoints");
  const top10Scores = React.useMemo(
    () =>
      Object.entries(scoresData)
        .map(([_, value]) => ({
          ...value,
          avgScorePerClick: value.totalPoints / value.clicks,
        }))
        .sort((a, b) => b[sortingField] - a[sortingField])
        .slice(0, 10),
    [scoresData, sortingField]
  );

  // For faster updates, I used object/map (map[<name>]: {{<clicks>, <totalPoints>...}}), name as a key
  React.useEffect(() => {
    setIsFetchingData(true);
    getScores()
      .then((data) =>
        setScoresData(data.reduce((a, v) => ({ ...a, [v.name]: v }), {}))
      )
      .finally(() => setIsFetchingData(false));
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
      <TableWrapper>
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
            ? "Click here to sort by average points per click"
            : "Click here to sort by points"}
        </Button>
        {!isFetchingData ? (
          <Leaderboard top10Scores={top10Scores} />
        ) : (
          <div>Loading...</div>
        )}
      </TableWrapper>
    </Main>
  );
}

export default HighScoreApp;
