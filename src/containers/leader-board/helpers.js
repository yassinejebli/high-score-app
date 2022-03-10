import memoize from "lodash/memoize";
import orderBy from "lodash/orderBy";

export const getPositionByScore = memoize((name, scores) => {
  return (
    orderBy(scores, (s) => s.totalPoints, "desc").findIndex(
      (score) => score.name === name
    ) + 1
  );
});
