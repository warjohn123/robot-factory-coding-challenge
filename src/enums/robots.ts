export enum RobotStatusEnum {
  ON_FIRE = "on fire",
  RUSTY = "rusty",
  LOOSE_SCREWS = "loose screws",
  PAINT_SCRATCHED = "paint scratched",
}

type RobotStatus =
  | RobotStatusEnum.ON_FIRE
  | RobotStatusEnum.RUSTY
  | RobotStatusEnum.LOOSE_SCREWS
  | RobotStatusEnum.PAINT_SCRATCHED;
