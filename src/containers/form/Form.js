/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Flex, Score, Wrapper } from "./Form.css";

const MAX_NUMBER_OF_CLICKS = 10;
const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

function Form({ addScore }) {
  const [score, setScore] = React.useState(0);
  const [clickCounter, setClickCounter] = React.useState(0);
  const [name, setName] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const reachedMaxNumberOfClicks = MAX_NUMBER_OF_CLICKS === clickCounter;
  const isNameEntered = name && !/^\s*$/.test(name);

  const setScoreHandler = (e) => {
    e.preventDefault();
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

  const submitHandler = (e) => {
    e.preventDefault();
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

  // TODO: Show success message when the score is saved successfully

  return (
    <form onSubmit={submitHandler}>
      <Wrapper>
        {error && (
          <Alert
            css={css`
              margin-bottom: 4px;
            `}
            variant="error"
          >
            {error}
          </Alert>
        )}
        {/* Will reset on development mode */}
        {reachedMaxNumberOfClicks ? (
          <Alert
            css={css`
              margin-bottom: 4px;
            `}
            variant="warning"
          >
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
        <div>
          <Input
            id="name"
            placeholder="Enter a name here..."
            type="text"
            value={name}
            onChange={setNameHandler}
            // error
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || !isNameEntered}
            onClick={submitHandler}
            css={css`
              margin-top: 8px;
            `}
          >
            {isSubmitting ? "Submitting..." : "Send it!"}
          </Button>
        </div>
      </Wrapper>
    </form>
  );
}

export default React.memo(Form);
