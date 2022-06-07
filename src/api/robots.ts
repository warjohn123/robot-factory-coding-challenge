import Axios from "axios";
// import { User, UserCount, UsersResponse } from "../models/User";
import { API_ROUTES } from "./APIRoutes";

export class RobotAPI {
  getRobots(): Promise<Robot[]> {
    return Axios.get(API_ROUTES.robot).then(
      (response) => response.data as Robot[]
    );
  }
}
