import { configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import localForage from "localforage";
import rootReducer from "../reducer";
const persistConfig = {
	key: "root",
	version: 1,
	storage: localForage, // EMPLACEMENT DE SAUVEGARDE DE LETAT
	blacklist: [], // REDUCER DONT ON NE VEUT PAS SAUVER LETAT
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
				// ignoredPath: ["REGISTER"],
			},
		}),
});

export const persistor = persistStore(store);
