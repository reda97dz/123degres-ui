import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import projectsReducer from './slices/projects.slice';
import userReducer from './slices/usersTmp.slice';
import projectReducer from './slices/project.slice';

const reducer = combineReducers({
  projects: projectsReducer,
  users: userReducer,
  project: projectReducer,
});

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
