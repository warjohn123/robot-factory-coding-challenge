import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RobotAPI } from "api/robots";
import { isFactorySecond, isRecyclable } from "pages/quality-assurance/helpers";

interface RobotState {
  isLoading: boolean;
  allRobots: Robot[];
  factorySecondsRobots: Robot[];
  passedQARobots: Robot[];
  addedToShipmentRobots: Robot[];
}

const initialState: RobotState = {
  isLoading: false,
  allRobots: [],
  factorySecondsRobots: [],
  passedQARobots: [],
  addedToShipmentRobots: [],
};

export const fetchRobotsForQA = createAsyncThunk("robots", async () => {
  const robots = (await new RobotAPI().getRobots()) as Robot[];
  return robots;
});

export const extinguishRobot = createAsyncThunk(
  "robots-extinguish",
  async (robot: Robot) => {
    await new RobotAPI().extinguishRobot(robot);
  }
);

export const recycleRobot = createAsyncThunk(
  "robots-recycle",
  async (robots: Robot[]) => {
    await new RobotAPI().recycleRobots(robots);
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
      });
  },
});

// Action creators are generated for each case reducer function
export const { pushAddedToShipmentRobots, removeFromShipmentRobots } =
  robotSlice.actions;

export default robotSlice.reducer;
