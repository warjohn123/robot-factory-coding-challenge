interface Robot {
  id: number;
  name: string;
  configuration: RobotConfiguration;
  statuses: RobotStatus[];
}

interface RobotConfiguration {
  hasSentience: boolean;
  hasWheels: boolean;
  hasTracks: boolean;
  numberOfRotors: BigInteger;
  Colour: string;
}

type RobotStatus = "on fire" | "rusty" | "loose screws" | "paint scratched";
