import Axios from "axios";
import { RobotStatusEnum } from "enums/robots";
import { API_ROUTES } from "./APIRoutes";

export class RobotAPI {
  getRobots(): Promise<Robot[]> {
    return Axios.get(API_ROUTES.robot).then(
      (response) => response.data as Robot[]
    );
  }

  extinguishRobot(robot: Robot): Promise<Robot> {
    return Axios.put(API_ROUTES.extinguish(robot.id), {
      ...robot,
      statuses: robot.statuses.filter(
        (status) => status != RobotStatusEnum.ON_FIRE
      ),
    }).then((response) => response.data as Robot);
  }
}
