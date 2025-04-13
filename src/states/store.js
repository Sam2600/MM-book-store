import { configureStore } from '@reduxjs/toolkit';
import novelReducer from '../states/features/novel/novelSlice';

export const store = configureStore({
   reducer: {
      novel: novelReducer,
   },
})