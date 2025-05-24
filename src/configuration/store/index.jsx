import {configureStore, StoreEnhancer} from "@reduxjs/toolkit";
import {createInjectorsEnhancer} from "redux-injectors";
import createSagaMiddleware from "redux-saga";

import {createReducer} from "../reducers";

export const configureAppStore = () => {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const {run: runSaga} = sagaMiddleware;

    // Create the store with saga middleware
    const middlewares = [sagaMiddleware];

    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ];

    console.log("configureAppStore");
    const store = configureStore({
        reducer: createReducer(),
        middleware: (defaultMiddleware) => [
            ...defaultMiddleware({serializableCheck: false}),
            ...middlewares,
        ],
        devTools:
        /* istanbul ignore next line */
            process.env.NODE_ENV !== "production" ||
            process.env.PUBLIC_URL.length > 0,
        enhancers,
    });

    return store;
};

const store = configureAppStore();
export default store;
