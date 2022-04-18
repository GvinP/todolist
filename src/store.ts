import {taskReducer} from "./reducers/taskReducer";
import {todolistReducer} from "./reducers/todolistReducer";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const store = createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>

export default store;
