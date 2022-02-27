import React from "react";
import { Main, TableWrapper } from "./HighScoreApp.css";
import { getScores } from "./api";
import Form from "./containers/form/Form";
import Leaderboard from "./containers/leader-board/Leaderboard";
import Button from "./components/Button";
import { getPositionByScore } from "./helpers";
import divide from "lodash/divide";
import orderBy from "lodash/orderBy";

function HighScoreApp() {
  const [scoresData, setScoresData] = React.useState({});
  const [isFetchingData, setIsFetchingData] = React.useState(false);
  const [isSortingByAvg, setIsSortingByAvg] = React.useState(false);
  const top10Scores = React.useMemo(
    () =>
      orderBy(
        Object.entries(scoresData).map(([_, value]) => ({
          ...value,
          avgScorePerClick: divide(value.totalPoints, value.clicks),
          position: getPositionByScore(value.name, Object.values(scoresData)),
        })),
        (o) => o[isSortingByAvg ? "avgScorePerClick" : "totalPoints"],
        "desc"
      ).slice(0, 10),
    [scoresData, isSortingByAvg]
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
        <Button onClick={() => setIsSortingByAvg(!isSortingByAvg)}>
          {isSortingByAvg
            ? "Click here to sort by points"
            : "Click here to sort by average points per click"}
        </Button>
        {!isFetchingData ? (
          <Leaderboard scoresData={scoresData} top10Scores={top10Scores} />
        ) : (
          <div>Loading...</div>
        )}
      </TableWrapper>
    </Main>
  );
}

export default HighScoreApp;
