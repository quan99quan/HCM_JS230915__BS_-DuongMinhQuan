import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;

}

interface TodoState {
  data: Todo[] | null;
}

const initialState: TodoState = {
  data: null,
};

const todoSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Todo[] | null>) => {
      state.data = action.payload;
    },

    addTodo: (state, action: PayloadAction<Todo>) => {
      if (state.data) {
        state.data.push(action.payload);
      }
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.data = state.data ? state.data.filter((todo) => todo.id !== action.payload) : null;
    },

    updateTodo: (state, action: PayloadAction<{ id: number; data: Partial<Todo> }>) => {
      state.data = state.data
        ? state.data.map((todo) => {
            if (todo.id === action.payload.id) {
              return { ...todo, ...action.payload.data };
            }
            return todo;
          })
        : null;
    },
  },
});

export const todoReducer = todoSlice.reducer;
export const todoActions = todoSlice.actions;
