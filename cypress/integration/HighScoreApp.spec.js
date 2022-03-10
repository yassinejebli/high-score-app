describe("HighScoreApp", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Set score button decreases number of clicks left", () => {
    cy.get("[data-cy=clicks-counter]").contains("Clicks left: 10");
    cy.get("[data-cy=set-score]").click();
    cy.get("[data-cy=clicks-counter]").contains("Clicks left: 9");
  });

  it("Show a warning when reaching the maximum number of clicks", () => {
    cy.get("[data-cy=clicks-counter]").contains("Clicks left: 10");
    for (let i = 0; i < 10; i++) cy.get("[data-cy=set-score]").click();
    cy.get("[data-cy=warning]").contains(
      "You have reached the maximum number of clicks"
    );
  });
});
