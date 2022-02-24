import React from "react";
import { Main } from "./HighScoreApp.css";
import { getScores } from "./api";
import Form from "./containers/form/Form";
import Leaderboard from "./containers/leader-board/Leaderboard";

function HighScoreApp() {
  const [scoresData, setScoresData] = React.useState({});

  // useMemo has not effect here because setScoresData is the only trigger for the re-rendering of this component
  const top10Scores = React.useMemo(
    () =>
      Object.entries(scoresData)
        .sort(([_, a], [__, b]) => b.totalPoints - a.totalPoints)
        .slice(0, 10)
        .map(([_, value]) => value),
    [scoresData]
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
      <Leaderboard top10Scores={top10Scores} />
    </Main>
  );
}

export default HighScoreApp;
