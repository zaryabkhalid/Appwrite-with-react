import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		setTodos: (state, action) => {
			state.todos = action.payload;
		},
	},
});

export const { setTodos } = todoSlice.actions;

export default todoSlice.reducer;
