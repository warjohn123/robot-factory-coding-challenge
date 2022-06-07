import React from "react";
import { render, screen } from "@testing-library/react";
import { RobotsList } from "pages/robots-list";

test("renders learn react link", () => {
  render(<RobotsList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
