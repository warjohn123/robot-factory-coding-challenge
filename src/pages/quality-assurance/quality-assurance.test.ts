import { isFactorySecond, isRecyclable } from "pages/quality-assurance/helpers";
import { RobotStatusEnum } from "enums/robots";

describe("robot helper functions", () => {
  it("should be factory second", async () => {
    expect(isFactorySecond([RobotStatusEnum.LOOSE_SCREWS])).toBeTruthy();
    expect(
      isFactorySecond([
        RobotStatusEnum.PAINT_SCRATCHED,
        RobotStatusEnum.ON_FIRE,
      ])
    ).toBeTruthy();
    expect(
      isFactorySecond([RobotStatusEnum.PAINT_SCRATCHED, RobotStatusEnum.RUSTY])
    ).toBeTruthy();
  });

  it("should not be factory second", async () => {
    expect(isFactorySecond([])).toBeFalsy();
  });

  it("should be recyclable", async () => {
    expect(
      isRecyclable({
        id: 123,
        configuration: {
          hasSentience: true,
          hasTracks: true,
          hasWheels: true,
          numberOfRotors: 8,
          Colour: "blue",
        },
        name: "Robot 10",
        statuses: [],
      })
    ).toBeTruthy();
  });

  it("should not be recyclable", async () => {
    expect(
      isRecyclable({
        id: 123,
        configuration: {
          hasSentience: true,
          hasTracks: false,
          hasWheels: true,
          numberOfRotors: 5,
          Colour: "red",
        },
        name: "Robot 5",
        statuses: [],
      })
    ).toBeFalsy();
  });
});
