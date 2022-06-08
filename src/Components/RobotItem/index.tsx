import React from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./RobotItem.module.scss";
import { FaFireExtinguisher, FaRecycle, FaCheck } from "react-icons/fa";
import { RobotStatusEnum } from "enums/robots";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  extinguishRobot,
  fetchRobotsForQA,
  pushAddedToShipmentRobots,
  removeFromShipmentRobots,
} from "store/robot";
import { isRecyclable, isOnFire } from "pages/quality-assurance/helpers";

interface RobotItemProps {
  robot: Robot;
}

export function RobotItem({ robot }: RobotItemProps) {
  const dispatch = useAppDispatch();
  const passedQARobots = useAppSelector((state) => state.robots.passedQARobots);
  const factorySecondRobots = useAppSelector(
    (state) => state.robots.factorySecondsRobots
  );
  const addedToShipmentRobots = useAppSelector(
    (state) => state.robots.addedToShipmentRobots
  );
  const getRobotStatus = () => {
    let robotStatus = "";
    if (!robot.statuses.length) return "N/A";

    robot.statuses.map((status: string) => {
      robotStatus += `${status}, `;
      return status;
    });
    robotStatus = robotStatus.slice(0, -2);
    return robotStatus;
  };

  const extinguish = () => {
    dispatch(extinguishRobot(robot));
    dispatch(fetchRobotsForQA());
  };

  const recycle = () => {};

  const addToShipment = () => {
    dispatch(pushAddedToShipmentRobots(robot));
  };

  const removeFromShipment = () => {
    dispatch(removeFromShipmentRobots(robot));
  };

  const getRobotYesNoValue = (property: boolean) => {
    return property ? "Yes" : "No";
  };

  const handleExtinguish = () => {
    const { statuses } = robot;
    const { hasSentience } = robot.configuration;
    return isOnFire(
      statuses.includes(RobotStatusEnum.ON_FIRE) && hasSentience
    ) ? (
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

  const handleReadyToShip = () => {
    const passedQa = passedQARobots.find(
      (addedToShipmentRobot: Robot) => addedToShipmentRobot.id === robot.id
    );

    const factorySecond = factorySecondRobots.find(
      (factorySecondRobot: Robot) => factorySecondRobot.id === robot.id
    );

    return passedQa || factorySecond ? (
      <Button onClick={addToShipment}>Add to Shipment</Button>
    ) : null;
  };

  const handleRemoveFromShipment = () => {
    const addedToShipment = addedToShipmentRobots.find(
      (addedToShipmentRobot: Robot) => addedToShipmentRobot.id === robot.id
    );

    return addedToShipment ? (
      <Button onClick={removeFromShipment}>Remove from Shipment</Button>
    ) : null;
  };

  return (
    <Card className={`${styles.RobotItem}`}>
      <Card.Header className={styles.RobotItemCardHeader}>
        <p>{robot.name}</p>

        <div className={styles.ActionIcons}>
          {handleExtinguish()}
          {handleRecycle()}
          {handleReadyToShip()}
          {handleRemoveFromShipment()}
        </div>
      </Card.Header>
      <Card.Body className={styles.RobotItemCardBody}>
        <p>ID: {robot.id}</p>
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
