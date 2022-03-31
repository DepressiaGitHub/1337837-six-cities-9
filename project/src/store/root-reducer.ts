import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appData } from './app-data/app-data';
import { appProcess } from './app-process/app-process';
import { userProcess } from './user-process/user-process';


export const rootReducer = combineReducers({
  [NameSpace.data]: appData.reducer,
  [NameSpace.app]: appProcess.reducer,
  [NameSpace.user]: userProcess.reducer,
});
