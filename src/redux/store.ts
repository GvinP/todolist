import {taskReducer} from "./taskReducer";
import {todolistReducer} from "./todolistReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>

export default store;
