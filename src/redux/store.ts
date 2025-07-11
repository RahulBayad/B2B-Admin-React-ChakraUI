import { configureStore } from "@reduxjs/toolkit";
import businessEntityReducer from "./slices/businessEntitiesSlice";
// Export RootState and AppDispatch

export const store = configureStore({
    reducer : {
        businessEntity : businessEntityReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;