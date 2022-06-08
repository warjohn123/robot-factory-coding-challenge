import { RobotItem } from "Components/RobotItem";
import { useAppSelector } from "hooks";
import React from "react";

interface RobotsListProps {
  robots: Robot[];
}

export function RobotsList({ robots }: RobotsListProps) {
  const isLoading = useAppSelector((state) => state.robots.isLoading);

  if (isLoading) return <div>Loading...</div>;
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
