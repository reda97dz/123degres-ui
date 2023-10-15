import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ProjectBoardState {
  currentWeekOffset: number;
}

const initialState: ProjectBoardState = {
  currentWeekOffset: 0,
};

const projectBoardSlice = createSlice({
  name: 'project board',
  initialState,
  reducers: {
    incrementWeekOffset: (state) => {
      state.currentWeekOffset += 1;
    },
    decrementWeekOffset: (state) => {
      state.currentWeekOffset -= 1;
    },
    resetWeekOffset: (state) => {
      state.currentWeekOffset = 1;
    },
  },
});

export const { decrementWeekOffset, incrementWeekOffset, resetWeekOffset } =
  projectBoardSlice.actions;
export const selectProjectBoard = (state: RootState) => state.projectBoard;
export default projectBoardSlice.reducer;
