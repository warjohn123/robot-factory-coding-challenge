import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

interface RobotItemProps {
  robot: Robot;
}

export function RobotItem({ robot }: RobotItemProps) {
  return <Card>{robot.name}</Card>;
}
