import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./slices/todolist.slice";
import { combineReducers} from "@reduxjs/toolkit";
const RootReducer = combineReducers({
    todoStore: todoReducer,

})
export type Store = ReturnType<typeof RootReducer>
export const store = configureStore({
    reducer: RootReducer
})