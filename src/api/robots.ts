import Axios from "axios";
import { RobotStatusEnum } from "enums/robots";
import { API_ROUTES } from "./APIRoutes";

export class RobotAPI {
  getRobots(limit: number): Promise<Robot[]> {
    return Axios.get(API_ROUTES.robot, {
      params: {
        _limit: limit,
      },
    }).then((response) => response.data as Robot[]);
  }

  extinguishRobot(robot: Robot): Promise<Robot> {
    return Axios.put(API_ROUTES.extinguish(robot.id), {
      ...robot,
      statuses: robot.statuses.filter(
        (status) => status !== RobotStatusEnum.ON_FIRE
      ),
    }).then((response) => response.data as Robot);
  }

  recycleRobots(robots: Robot[]): Promise<number[]> {
    return Axios.post(API_ROUTES.recycle, {
      recycleRobots: robots.map((robot) => robot.id),
    }).then((response) => response.data as number[]);
  }

  sendShipment(robots: Robot[]): Promise<number[]> {
    return Axios.post(API_ROUTES.sendShipment, {
      shipmentRobots: robots.map((robot) => robot.id),
    }).then((response) => response.data as number[]);
  }
}
