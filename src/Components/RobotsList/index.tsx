import { RobotItem } from "Components/RobotItem";
import React from "react";

interface RobotsListProps {
  robots: Robot[];
}

export function RobotsList({ robots }: RobotsListProps) {
  return (
    <>
      {robots.length ? (
        robots.map((robot: Robot) => (
          <div className="mb-3">
            <RobotItem robot={robot} />
          </div>
        ))
      ) : (
        <div>Nothing to display</div>
      )}
    </>
  );
}
