import storage from "redux-persist/lib/storage";
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

import { contactsReducer } from "./contactsSlice";
import { filterReducer } from "./filtersSlice";

const contactsConfig = {
  key: "contucts",
  storage,
  whitelist: ["items"],
};

export const store = configureStore({
  reducer: {
    contacts: persistReducer(contactsConfig, contactsReducer),
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);