import React from "react";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Flex, Score, Wrapper } from "./Form.css";

const MAX_NUMBER_OF_CLICKS = 10;
// const IS_DEV = false;
const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export default function Form({ addScore }) {
  const [score, setScore] = React.useState(0);
  const [clickCounter, setClickCounter] = React.useState(0);
  const [name, setName] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const reachedMaxNumberOfClicks = MAX_NUMBER_OF_CLICKS === clickCounter;
  const isNameEntered = name && !/^\s*$/.test(name);

  const setScoreHandler = () => {
    if (reachedMaxNumberOfClicks && IS_DEV) {
      setClickCounter(0);
      return;
    }

    const random = Math.floor(Math.random() * (100 - -100 + 1) + -100);
    setScore(random);
    setClickCounter(clickCounter + 1);
  };

  const setNameHandler = ({ target: { value } }) => {
    setName(value);
    // to set the current user clicks
    // if (scoresData[value]) {
    //   setClickCounter(scoresData[value].clicks);
    // }
  };

  const submitHandler = () => {
    try {
      setIsSubmitting(true);
      const payload = {
        name,
        totalPoints: score,
        clicks: clickCounter,
      };
      // await createScore(payload);
      addScore(payload);
      setName("");
      setScore(0);
      setClickCounter(0);
    } catch (error) {
      setError("Oops! something bad happened!");
      console.error({ error, name, score, clickCounter });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      {error && (
        <Alert style={{ marginBottom: 4 }} variant="error">
          {error}
        </Alert>
      )}
      {reachedMaxNumberOfClicks ? (
        <Alert style={{ marginBottom: 4 }} variant="warning">
          You have reached the maximum number of clicks
        </Alert>
      ) : (
        <Alert variant="info">
          Clicks left: {MAX_NUMBER_OF_CLICKS - clickCounter}
        </Alert>
      )}

      <Flex>
        <Button
          disabled={reachedMaxNumberOfClicks && !IS_DEV}
          onClick={setScoreHandler}
        >
          Set score
        </Button>
        <Score data-testid="score" score={score}>
          {score}
        </Score>
      </Flex>
      <label htmlFor="name">Name</label>
      <br />
      <Input
        id="name"
        width="300px"
        placeholder="Enter a name here..."
        type="text"
        value={name}
        onChange={setNameHandler}
        // error
      />
      <Button
        variant="primary"
        disabled={isSubmitting || !isNameEntered}
        onClick={submitHandler}
        style={{ marginLeft: 4 }}
      >
        {isSubmitting ? "Submitting..." : "Send it!"}
      </Button>
    </Wrapper>
  );
}
