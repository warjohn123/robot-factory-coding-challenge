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
  numberOfRotors: number;
  Colour: string;
}
