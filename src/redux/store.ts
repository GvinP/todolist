import {taskReducer} from "./taskReducer";
import {todolistReducer} from "./todolistReducer";
import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;

export type TypedDispatch = ThunkDispatch<AppStateType, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AnyAction
    >;

export default store;