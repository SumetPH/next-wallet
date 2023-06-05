import { configureStore } from "@reduxjs/toolkit";
import drawerSlice from "./drawerSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// ...

export const store = configureStore({
  reducer: {
    drawer: drawerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
