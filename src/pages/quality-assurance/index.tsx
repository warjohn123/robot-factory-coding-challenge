import { useAppSelector } from "hooks";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import robot, { fetchRobotsForQA, recycleRobot } from "store/robot";
import styles from "./quality-assurance.module.scss";
import { isRecyclable } from "pages/quality-assurance/helpers";
import { RobotsList } from "Components/RobotsList";
import { LIMIT } from "constants/index";

export function QualityAssurance() {
  const dispatch = useDispatch<AppDispatch>();
  const [showRecycleButton, setShowRecycleButton] = useState<boolean>(false);
  const [qaRobots, setQARobots] = useState<Robot[]>([]);

  const allRobots = useAppSelector((state) => state.robots.allRobots);
  const addedToShipmentRobots = useAppSelector(
    (state) => state.robots.addedToShipmentRobots
  );
  const isLoading = useAppSelector((state) => state.robots.isLoading);

  const recycleRobots = async () => {
    const recyclableRobots: Robot[] = allRobots.filter((robot) =>
      isRecyclable(robot)
    );
    await dispatch(recycleRobot(recyclableRobots));
    await dispatch(fetchRobotsForQA(LIMIT));
  };

  useEffect(() => {
    if (!isLoading && allRobots.length) {
      setQARobots(
        allRobots.filter(
          (robot: Robot) =>
            !addedToShipmentRobots.find(
              (shipmentRobot: Robot) => robot.id === shipmentRobot.id
            )
        )
      );
      allRobots.map((robot: Robot) => {
        if (isRecyclable(robot)) setShowRecycleButton(true);
        else setShowRecycleButton(false);
        return robot;
      });
    }
  }, [isLoading, allRobots, addedToShipmentRobots]);

  return (
    <>
      {showRecycleButton ? (
        <div className={styles.RecycleButtonContainer}>
          <Button onClick={recycleRobots}>Recycle robots</Button>
        </div>
      ) : null}

      <div className="mt-3">
        <RobotsList robots={qaRobots} />
      </div>
    </>
  );
}
