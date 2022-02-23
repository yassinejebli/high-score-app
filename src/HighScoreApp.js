import React from "react";
import Button, { VARIANTS } from "./components/Button";
import Input from "./components/Input";
import { Main, Score } from "./HighScoreApp.css";

function HighScoreApp() {
  const [score, setScore] = React.useState(0);
  const [clickCounter, setClickCounter] = React.useState(0);
  const [name, setName] = React.useState("");
  // const [isSubmitting, setIsSubmitting] = React.useState(false);
  // const [error, setError] = React.useState();

  const setScoreHandler = () => {
    if (clickCounter > 9) {
      setScore(0);
      setClickCounter(0);
      setName("");
      return;
    }

    const random = Math.floor(Math.random() * (100 - -100 + 1) + -100);
    setScore(random);
    setClickCounter(clickCounter + 1);
  };

  const setNameHandler = ({ target: { value } }) => {
    setName(value);
  };

  const submitHandler = async () => {
    const response = await fetch("http://dummy.com/endpoint", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score, name, clickCounter }),
    });
    console.log({ response });
  };

  return (
    <Main>
      <Score score={score}>{score}</Score>
      <Input
        width="300px"
        placeholder="Enter a name here..."
        type="text"
        value={name}
        onChange={setNameHandler}
        error
      />
      <Button variant="primary" onClick={setScoreHandler}>
        Set score
      </Button>
      <Button onClick={submitHandler}>Submit</Button>
    </Main>
  );
}

export default HighScoreApp;
