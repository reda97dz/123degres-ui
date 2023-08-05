import { ProjectResponseSuccess } from '@/modules/supabase/projects';
import { GetProjectTeamSuccess } from '@/modules/supabase/teams';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';

interface ProjectState {
  project: ProjectResponseSuccess;
  team: GetProjectTeamSuccess;
}

const initialState: ProjectState = {
  project: null,
  team: null,
};

const projectSlice = createSlice({
  name: 'current project',
  initialState,
  reducers: {
    fetchProjectSuccess(state, action: PayloadAction<ProjectState>) {
      state.project = action.payload.project;
      state.team = action.payload.team;
    },
    clearProject(state) {
      state = initialState;
    },
  },
});

export const { fetchProjectSuccess, clearProject } = projectSlice.actions;
export const setInitialProject =
  (project: ProjectState): AppThunk =>
  (dispatch) => {
    dispatch(fetchProjectSuccess(project));
  };
export const selectProject = (state: RootState) => state.project;
export default projectSlice.reducer;
