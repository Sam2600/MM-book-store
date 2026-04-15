import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../states/features/user/userSlice';
import novelReducer from '../states/features/novel/novelSlice';
import navMenuListReducer from '../states/features/nav/navMenuListSlice';
import payoutReducer from '../states/features/admin/payoutSlice';

export const store = configureStore({
   reducer: {
      user: userReducer,
      novel: novelReducer,
      navMenuList: navMenuListReducer,
      payout: payoutReducer,
   },
})