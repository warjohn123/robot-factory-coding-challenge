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

export const fetchRobots = createAsyncThunk("robots", async () => {
  const robots = (await new RobotAPI().getRobots()) as Robot[];
  return robots;
});

export const robotSlice = createSlice({
  name: "robot",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRobots.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRobots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.robots = state.robots.concat(action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
// export const { listRobots } = robotSlice.actions;

export default robotSlice.reducer;
