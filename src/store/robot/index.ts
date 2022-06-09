import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RobotAPI } from "api/robots";
import { isFactorySecond, isRecyclable } from "pages/quality-assurance/helpers";
import { toast } from "react-toastify";
import { toastMessage } from "utils/log";

interface RobotState {
  isLoading: boolean;
  allRobots: Robot[];
  factorySecondsRobots: Robot[];
  passedQARobots: Robot[];
  addedToShipmentRobots: Robot[];
}

const initialState: RobotState = {
  isLoading: true,
  allRobots: [],
  factorySecondsRobots: [],
  passedQARobots: [],
  addedToShipmentRobots: [],
};

export const fetchRobotsForQA = createAsyncThunk(
  "robots",
  async (limit: number) => {
    const robots = (await new RobotAPI().getRobots(limit)) as Robot[];
    return robots;
  }
);

export const extinguishRobot = createAsyncThunk(
  "robots-extinguish",
  async (robot: Robot) => {
    await new RobotAPI().extinguishRobot(robot);

    toastMessage("Robot successfully extinguished");
  }
);

export const recycleRobot = createAsyncThunk(
  "robots-recycle",
  async (robots: Robot[]) => {
    await new RobotAPI().recycleRobots(robots);

    toastMessage("Robot successfully recycled");
  }
);

export const sendShipment = createAsyncThunk(
  "robots-send-shipment",
  async (robots: Robot[]) => {
    await new RobotAPI().sendShipment(robots);

    toastMessage("Robot successfully shipped");
    return robots.map((robot) => robot.id);
  }
);

export const robotSlice = createSlice({
  name: "robot",
  initialState,
  reducers: {
    removeFromShipmentRobots: (state, action) => {
      const { id, statuses } = action.payload;

      state.addedToShipmentRobots.splice(
        state.addedToShipmentRobots.findIndex(
          (robot: Robot) => robot.id === id
        ),
        1
      );

      if (isFactorySecond(statuses)) {
        state.factorySecondsRobots.push(action.payload);
      } else {
        state.passedQARobots.push(action.payload);
      }
    },
    pushAddedToShipmentRobots: (state, action) => {
      const { id, statuses } = action.payload;
      state.addedToShipmentRobots.push(action.payload);

      if (isFactorySecond(statuses)) {
        state.factorySecondsRobots.splice(
          state.factorySecondsRobots.findIndex(
            (robot: Robot) => robot.id === id
          ),
          1
        );
      } else {
        state.passedQARobots.splice(
          state.passedQARobots.findIndex((robot: Robot) => robot.id === id),
          1
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRobotsForQA.pending, (state) => {
        state.allRobots = [];
        state.isLoading = true;
      })
      .addCase(fetchRobotsForQA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allRobots = action.payload;

        const qualifiedRobots = state.allRobots.filter(
          (robot: Robot) => !isRecyclable(robot)
        );
        const factorySecondRobots = qualifiedRobots.filter((robot) =>
          isFactorySecond(robot.statuses)
        );
        const passedQARobots = qualifiedRobots.filter(
          (robot) => !isFactorySecond(robot.statuses)
        );

        state.factorySecondsRobots = factorySecondRobots;
        state.passedQARobots = passedQARobots;
      })
      .addCase(extinguishRobot.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(extinguishRobot.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendShipment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendShipment.fulfilled, (state, action: { payload: any }) => {
        state.isLoading = false;
        const { payload } = action;
        const shipmentRobots: number[] = payload as number[];

        state.addedToShipmentRobots = state.addedToShipmentRobots.filter(
          (robot: Robot) => !shipmentRobots.includes(robot.id)
        );
        toastMessage("Robot successfully shipped!");
      });
  },
});

// Action creators are generated for each case reducer function
export const { pushAddedToShipmentRobots, removeFromShipmentRobots } =
  robotSlice.actions;

export default robotSlice.reducer;
