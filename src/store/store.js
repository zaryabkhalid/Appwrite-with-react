import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import todoReducer from "../features/todos/todoSlice";

const store = configureStore({
	reducer: {
		authReducer,
		todoReducer,
	},
});

export default store;
