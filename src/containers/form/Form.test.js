import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./Form";

describe("Form", () => {
  it("should disable button when name is not entered", () => {
    const addScore = jest.fn();
    render(<Form addScore={addScore} />);
    expect(screen.getByText("Send it!")).toBeDisabled();
  });

  it("should enable button when name is entered", () => {
    const addScore = jest.fn();
    render(<Form addScore={addScore} />);
    const inputName = screen.getByLabelText("Name");
    fireEvent.change(inputName, { target: { value: "John Doe" } });
    expect(inputName.value).toBe("John Doe");
    expect(screen.getByText("Send it!")).toBeEnabled();
  });

  it("should set a random score between -100 and 100", () => {
    const addScore = jest.fn();
    render(<Form addScore={addScore} />);
    const setScoreButton = screen.getByText("Set score");
    fireEvent.click(setScoreButton);
    const score = Number(screen.getByTestId("score").textContent);
    expect(score).toBeGreaterThanOrEqual(-100);
    expect(score).toBeLessThanOrEqual(100);
  });
});
