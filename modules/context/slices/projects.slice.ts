import { ProjectRow, ProjectsResponseSuccess, getProjects } from '@/modules/supabase/projects';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '@/modules/context/store';

interface ProjectsState {
  projects: ProjectsResponseSuccess | null;
  loading: boolean;
  errorMessage: string | null;
}

const initialState: ProjectsState = {
  projects: null,
  loading: false,
  errorMessage: null,
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  try {
    const response = await getProjects();
    return response;
  } catch (error) {
    throw error;
  }
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchProjectsStart(state) {
      state.loading = true;
      state.errorMessage = null;
    },
    fetchProjectsSuccess(state, action: PayloadAction<ProjectsResponseSuccess>) {
      state.projects = action.payload;
      state.loading = false;
      state.errorMessage = null;
    },
    addNewProject(state, action: PayloadAction<ProjectRow>) {
      if(state.projects){
        state.projects.push(action.payload)
      }
    }
  },
});

export const { fetchProjectsStart, fetchProjectsSuccess, addNewProject } = projectsSlice.actions;
export const setInitialProjects =
  (projects: ProjectsResponseSuccess): AppThunk =>
  (dispatch) => {
    dispatch(fetchProjectsSuccess(projects));
  };
export const selectProjects = (state: RootState) => state.projects;
export default projectsSlice.reducer;
