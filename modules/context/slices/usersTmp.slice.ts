import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '@/modules/context/store';
import { getUsersTmp, UsersTmpResponseSuccess, UserTmpRow } from '@/modules/supabase/users';

interface UsersState {
  users: UsersTmpResponseSuccess | null;
  loading: boolean;
  errorMessage: string | null;
}

const initialState: UsersState = {
  users: null,
  loading: false,
  errorMessage: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await getUsersTmp();
    return response;
  } catch (error) {
    throw error;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
      state.errorMessage = null;
    },
    fetchUsersSuccess(state, action: PayloadAction<UsersTmpResponseSuccess>) {
      state.users = action.payload;
      state.loading = false;
      state.errorMessage = null;
    },
    addNewUser(state, action: PayloadAction<UserTmpRow>) {
      if (state.users) {
        state.users.push(action.payload);
      }
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess, addNewUser } = usersSlice.actions;
export const setInitialUsers =
  (users: UsersTmpResponseSuccess): AppThunk =>
  (dispatch) => {
    dispatch(fetchUsersSuccess(users));
  };
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;
