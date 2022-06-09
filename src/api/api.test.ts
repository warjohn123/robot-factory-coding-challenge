import { LIMIT } from "constants/index";
import { RobotAPI } from "./robots";

describe("APIs", () => {
  it("returns 10 items when getting robots", async () => {
    const robots = await new RobotAPI().getRobots(LIMIT);
    expect(robots).toHaveLength(10); // Make an assertion on the result
  });

  it("returns Ok when extinguish is called", async () => {
    const response = await new RobotAPI().extinguishRobot({
      id: 30,
      name: "Robot 30",
      configuration: {
        hasSentience: true,
        hasWheels: false,
        hasTracks: true,
        numberOfRotors: 17,
        Colour: "red",
      },
      statuses: ["loose screws", "paint scratched"],
    }); // Run the function
    expect(response.status).toBe("Ok");
  });

  it("returns Ok when recycle is called", async () => {
    const response = await new RobotAPI().recycleRobots([
      {
        id: 30,
        name: "Robot 30",
        configuration: {
          hasSentience: true,
          hasWheels: false,
          hasTracks: true,
          numberOfRotors: 17,
          Colour: "red",
        },
        statuses: ["loose screws", "paint scratched"],
      },
    ]); // Run the function
    expect(response.status).toBe("Ok");
  });

  it("returns Ok when shipment/create is called", async () => {
    const response = await new RobotAPI().sendShipment([
      {
        id: 30,
        name: "Robot 30",
        configuration: {
          hasSentience: true,
          hasWheels: false,
          hasTracks: true,
          numberOfRotors: 17,
          Colour: "red",
        },
        statuses: ["loose screws", "paint scratched"],
      },
    ]); // Run the function
    expect(response.status).toBe("Ok");
  });
});
