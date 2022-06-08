import { useAppSelector } from "hooks";
import { RobotItem } from "Components/RobotItem";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { fetchRobotsForQA } from "store/robot";
import styles from "./shipping.module.scss";

export function Shipping() {
  const dispatch = useDispatch<AppDispatch>();

  const robots = useAppSelector((state) => state.robots.robots);
  const isLoading = useAppSelector((state) => state.robots.isLoading);

  useEffect(() => {
    dispatch(fetchRobotsForQA());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {robots.map((robot: Robot) => (
        <div className="mb-3">
          <RobotItem robot={robot} />
        </div>
      ))}
    </>
  );
}
