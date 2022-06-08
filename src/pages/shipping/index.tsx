import { useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
import { fetchRobotsForQA } from "store/robot";
import { RobotsList } from "Components/RobotsList";

export function Shipping() {
  const dispatch = useDispatch<AppDispatch>();
  const factorySecondRobots = useAppSelector(
    (state) => state.robots.factorySecondsRobots
  );
  const passedQARobots = useAppSelector((state) => state.robots.passedQARobots);
  const addedToShipmentRobots = useAppSelector(
    (state) => state.robots.addedToShipmentRobots
  );
  const isLoading = useAppSelector((state) => state.robots.isLoading);

  useEffect(() => {
    dispatch(fetchRobotsForQA());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Tabs
        defaultActiveKey="factory-second"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="factory-second" title="Factory Second">
          <RobotsList robots={factorySecondRobots} />
        </Tab>
        <Tab eventKey="passed-qa" title="Passed QA">
          <RobotsList robots={passedQARobots} />
        </Tab>
        <Tab eventKey="ready-to-ship" title="Ready to ship">
          <RobotsList robots={addedToShipmentRobots} />
        </Tab>
      </Tabs>
    </>
  );
}
