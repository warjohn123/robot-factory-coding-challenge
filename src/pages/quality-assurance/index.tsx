import { useAppSelector } from "hooks";
import { RobotItem } from "Components/RobotItem";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { fetchRobotsForQA } from "store/robot";
import styles from "./quality-assurance.module.scss";
import { isRecyclable } from "pages/quality-assurance/helpers";

export function QualityAssurance() {
  const dispatch = useDispatch<AppDispatch>();
  const [showRecycleButton, setShowRecycleButton] = useState<boolean>(false);

  const robots = useAppSelector((state) => state.robots.robots);
  const isLoading = useAppSelector((state) => state.robots.isLoading);

  const recycleRobots = () => {};

  useEffect(() => {
    dispatch(fetchRobotsForQA());
  }, []);

  useEffect(() => {
    if (!isLoading && robots.length) {
      robots.map((robot: Robot) => {
        if (isRecyclable(robot)) setShowRecycleButton(true);
      });
    }
  }, [isLoading, robots]);

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
        {robots.map((robot: Robot) => (
          <div className="mb-3">
            <RobotItem robot={robot} />
          </div>
        ))}
      </div>
    </>
  );
}
