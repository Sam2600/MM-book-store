import { configureStore } from '@reduxjs/toolkit';
import novelReducer from '../states/features/novel/novelSlice';
import navMenuListReducer from '../states/features/nav/navMenuListSlice';

export const store = configureStore({
   reducer: {
      novel: novelReducer,
      navMenuList: navMenuListReducer,
   },
})