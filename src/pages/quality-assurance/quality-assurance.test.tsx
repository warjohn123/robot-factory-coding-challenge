import React from "react";
import nock from "nock";
import { render, fireEvent } from "@testing-library/react";

import { QualityAssurance } from "pages/quality-assurance";

it("displays user data", async () => {
  const scope = nock("https://yoursite.com").get("/api").once().reply(200, {
    data: "response",
  });

  var { getByTestId, findByTestId } = render(<QualityAssurance />);
  fireEvent.click(getByTestId("apiCall"));
  expect(await findByTestId("ptag")).toHaveTextContent("response");
});
