import React from "react";
import { createScore } from "./api";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Input from "./components/Input";
import { Main, Score } from "./HighScoreApp.css";

const MAX_NUMBER_OF_CLICKS = 10;

function HighScoreApp() {
  const [score, setScore] = React.useState(0);
  const [clickCounter, setClickCounter] = React.useState(0);
  const [name, setName] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const reachedMaxNumberOfClicks = MAX_NUMBER_OF_CLICKS === clickCounter;

  const setScoreHandler = () => {
    if (reachedMaxNumberOfClicks) {
      setScore(0);
      setClickCounter(0);
      setName("");
      return;
    }

    const random = Math.floor(Math.random() * (100 - -100 + 1) + -100);
    setScore(score + random);
    // setScore(random);
    setClickCounter(clickCounter + 1);
  };

  const setNameHandler = ({ target: { value } }) => {
    setName(value);
  };

  const submitHandler = async () => {
    setError("");
    if (!isFormValid()) {
      setError("Please enter a name");
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await createScore({ score, name, clickCounter });
      console.log({ response });
    } catch (error) {
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return name && !/^\s*$/.test(name);
  };

  return (
    <Main>
      {error && <Alert variant="error">{error}</Alert>}
      {reachedMaxNumberOfClicks ? (
        <Alert variant="warning">
          You have reached the maximum number of clicks
        </Alert>
      ) : (
        <Alert variant="info">
          Clicks left: {MAX_NUMBER_OF_CLICKS - clickCounter}
        </Alert>
      )}

      <Score score={score}>{score}</Score>
      <Input
        width="300px"
        placeholder="Enter a name here..."
        type="text"
        value={name}
        onChange={setNameHandler}
        // error
      />
      <Button variant="primary" onClick={setScoreHandler}>
        Set score
      </Button>
      <Button disabled={isSubmitting} onClick={submitHandler}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </Main>
  );
}

export default HighScoreApp;
