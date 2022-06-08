import { useAppSelector } from "hooks";
import { RobotItem } from "Components/RobotItem";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { fetchRobotsForQA } from "store/robot";
import styles from "./shipping.module.scss";
import { isRecyclable } from "pages/quality-assurance/helpers";

export function Shipping() {
  const dispatch = useDispatch<AppDispatch>();
  const [showRecycleButton, setShowRecycleButton] = useState<boolean>(false);

  const robots = useAppSelector((state) => state.robots.robots);
  const isLoading = useAppSelector((state) => state.robots.isLoading);

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

  console.log("showRecycleButton", showRecycleButton);

  return (
    <>
      {showRecycleButton ? <Button>Recycle robots</Button> : null}
      {robots.map((robot: Robot) => (
        <div className="mb-3">
          <RobotItem robot={robot} />
        </div>
      ))}
    </>
  );
}
