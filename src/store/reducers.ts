import { combineReducers } from '@reduxjs/toolkit';
import clientsReducer from './clientsReducer';

const rootReducer = combineReducers({
  clients: clientsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
