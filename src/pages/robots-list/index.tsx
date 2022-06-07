import { useAppSelector } from "hooks";
import { RobotItem } from "pages/Components/RobotItem";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { fetchRobots } from "store/robot";
import { log } from "utils/log";
import styles from "./robots-list.module.scss";

export function RobotsList() {
  const dispatch = useDispatch<AppDispatch>();

  const robots = useAppSelector((state) => state.robots.robots);
  const isLoading = useAppSelector((state) => state.robots.isLoading);

  console.log("im h");
  useEffect(() => {
    dispatch(fetchRobots());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {robots.map((robot: Robot) => (
        <RobotItem robot={robot} />
      ))}
    </>
  );
}
