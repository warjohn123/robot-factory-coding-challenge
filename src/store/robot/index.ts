import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RobotAPI } from "api/robots";
import { log } from "utils/log";

interface RobotState {
  isLoading: boolean;
  robots: Robot[];
}

const initialState: RobotState = {
  isLoading: false,
  robots: [],
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

export const robotSlice = createSlice({
  name: "robot",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRobotsForQA.pending, (state) => {
        state.robots = [];
        state.isLoading = true;
      })
      .addCase(fetchRobotsForQA.fulfilled, (state, action) => {
        state.isLoading = false;
        state.robots = state.robots.concat(action.payload);
      })
      .addCase(extinguishRobot.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(extinguishRobot.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { listRobots } = robotSlice.actions;

export default robotSlice.reducer;
