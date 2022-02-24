const END_POINT = "./dummy-data.json";

export function createScore(scoreData) {
  return fetch(END_POINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scoreData),
  });
}

export async function getScores() {
  return fetch(END_POINT, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
