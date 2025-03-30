import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import todoSlice from "./TodoSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        todos: todoSlice
    },
})

export default store;