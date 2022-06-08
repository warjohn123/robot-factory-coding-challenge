import React from "react";
import { Card } from "react-bootstrap";
import styles from "./RobotItem.module.scss";
import { FaFireExtinguisher, FaRecycle } from "react-icons/fa";
import { RobotStatusEnum } from "enums/robots";
import { useAppDispatch } from "hooks";
import { extinguishRobot, fetchRobotsForQA } from "store/robot";
import { isRecyclable, isOnFire } from "pages/quality-assurance/helpers";

interface RobotItemProps {
  robot: Robot;
}

export function RobotItem({ robot }: RobotItemProps) {
  const dispatch = useAppDispatch();
  const getRobotStatus = () => {
    let robotStatus = "";
    robot.statuses.map((status: string) => {
      robotStatus += `${status}, `;
    });
    robotStatus = robotStatus.slice(0, -2);
    return robotStatus;
  };

  const extinguish = () => {
    dispatch(extinguishRobot(robot));
    dispatch(fetchRobotsForQA());
  };

  const recycle = () => {};

  const getRobotYesNoValue = (property: boolean) => {
    return property ? "Yes" : "No";
  };

  const handleExtinguish = () => {
    const { statuses } = robot;
    return isOnFire(statuses.includes(RobotStatusEnum.ON_FIRE)) ? (
      <FaFireExtinguisher
        title="Extinguish"
        className={styles.ExtinguishIcon}
        onClick={extinguish}
      />
    ) : null;
  };

  const handleRecycle = () => {
    return isRecyclable(robot) ? (
      <FaRecycle
        title="Recycle"
        className={styles.RecycleIcon}
        onClick={recycle}
      />
    ) : null;
  };

  return (
    <Card className={`${styles.RobotItem}`}>
      <Card.Header className={styles.RobotItemCardHeader}>
        <p>{robot.name}</p>

        <div className={styles.ActionIcons}>
          {handleExtinguish()}
          {handleRecycle()}
        </div>
      </Card.Header>
      <Card.Body className={styles.RobotItemCardBody}>
        <p>
          Has Sentience: {getRobotYesNoValue(robot.configuration.hasSentience)}
        </p>
        <p>Has Wheels: {getRobotYesNoValue(robot.configuration.hasWheels)}</p>
        <p>Has Tracks: {getRobotYesNoValue(robot.configuration.hasTracks)}</p>
        <p>Number of Rotors: {robot.configuration.numberOfRotors}</p>
        <p>Colour: {robot.configuration.Colour}</p>
        <p>Statuses:</p>
        <div className={styles.Status}>{getRobotStatus()}</div>
      </Card.Body>
    </Card>
  );
}
