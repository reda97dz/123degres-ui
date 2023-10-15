import { ProjectResponseSuccess } from '@/modules/supabase/projects';
import { GetProjectTeamSuccess } from '@/modules/supabase/teams';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { ModifiedProjectTasksSuccess } from '@/modules/supabase/tasks';

interface ProjectState {
  project: ProjectResponseSuccess;
  team: GetProjectTeamSuccess;
  tasks: ModifiedProjectTasksSuccess;
}

const initialState: ProjectState = {
  project: null,
  team: null,
  tasks: [],
};

const projectSlice = createSlice({
  name: 'current project',
  initialState,
  reducers: {
    fetchProjectSuccess(state, action: PayloadAction<ProjectState>) {
      state.project = action.payload.project;
      state.team = action.payload.team;
      state.tasks = action.payload.tasks;
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
