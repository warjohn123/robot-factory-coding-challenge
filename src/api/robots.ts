import Axios from "axios";
import { RobotStatusEnum } from "enums/robots";
import { API_ROUTES } from "./APIRoutes";

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

export class RobotAPI {
  getRobots(limit: number): Promise<Robot[]> {
    console.log("hoy");
    return Axios.get(API_ROUTES.robot, {
      params: {
        _limit: limit,
      },
    }).then((response) => response.data as Robot[]);
  }

  extinguishRobot(robot: Robot): Promise<{ status: string }> {
    return Axios.post(API_ROUTES.extinguish(robot.id), {
      ...robot,
      statuses: robot.statuses.filter(
        (status) => status !== RobotStatusEnum.ON_FIRE
      ),
    }).then((response) => response.data as { status: string });
  }

  recycleRobots(robots: Robot[]): Promise<{ status: string }> {
    return Axios.post(API_ROUTES.recycle, {
      recycleRobots: robots.map((robot) => robot.id),
    }).then((response) => response.data as { status: string });
  }

  sendShipment(robots: Robot[]): Promise<{ status: string }> {
    return Axios.put(API_ROUTES.sendShipment, {
      shipmentRobots: robots.map((robot) => robot.id),
    }).then((response) => response.data as { status: string });
  }
}
