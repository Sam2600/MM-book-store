import { createSlice } from "@reduxjs/toolkit";
import { LINKS, UPLOAD_MENU, BOOKMARK_MENU } from "../../../consts/Consts";
         
const initialState = {
   navMenus: localStorage.getItem("token") ? [...LINKS, BOOKMARK_MENU, UPLOAD_MENU] : LINKS,
}

export const navMenuListSlice = createSlice({

   name: 'navMenuList',

   initialState,

   reducers: {

      addExtraMenuItems: (state) => {
         state.navMenus.push(BOOKMARK_MENU);
         state.navMenus.push(UPLOAD_MENU);
      },

      removeExtraMenuItems: (state) => {
         state.navMenus = state.navMenus.filter(
            menu => menu.title !== UPLOAD_MENU.title && menu.title !== BOOKMARK_MENU.title
         );
      }
   }
});

export const getFetchNavMenuList = (state) => state.navMenuList.navMenus;

export default navMenuListSlice.reducer;

export const { addExtraMenuItems, removeExtraMenuItems } = navMenuListSlice.actions;