import { useAppSelector } from "hooks";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { recycleRobot } from "store/robot";
import styles from "./quality-assurance.module.scss";
import { isRecyclable } from "pages/quality-assurance/helpers";
import { RobotsList } from "Components/RobotsList";

export function QualityAssurance() {
  const dispatch = useDispatch<AppDispatch>();
  const [showRecycleButton, setShowRecycleButton] = useState<boolean>(false);

  const allRobots = useAppSelector((state) => state.robots.allRobots);
  const isLoading = useAppSelector((state) => state.robots.isLoading);

  const recycleRobots = () => {
    let recyclableRobots: Robot[] = allRobots.filter((robot) =>
      isRecyclable(robot)
    );
    dispatch(recycleRobot(recyclableRobots));
  };

  useEffect(() => {
    if (!isLoading && allRobots.length) {
      allRobots.map((robot: Robot) => {
        if (isRecyclable(robot)) setShowRecycleButton(true);
        return robot;
      });
    }
  }, [isLoading, allRobots]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {showRecycleButton ? (
        <div className={styles.RecycleButtonContainer}>
          <Button onClick={recycleRobots}>Recycle robots</Button>
        </div>
      ) : null}

      <div className="mt-3">
        <RobotsList robots={allRobots} />
      </div>
    </>
  );
}
