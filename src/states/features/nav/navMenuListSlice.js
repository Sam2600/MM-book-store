import { createSlice } from "@reduxjs/toolkit";
import { LINKS, UPLOAD_MENU } from "../../../consts/Consts";
         
const initialState = {
   navMenus: localStorage.getItem("token") ? [...LINKS, UPLOAD_MENU] : LINKS,
}

export const navMenuListSlice = createSlice({

   name: 'navMenuList',

   initialState,

   reducers: {

      addUploadNavMenuList: (state) => {
         state.navMenus.push(UPLOAD_MENU);
      },

      removeUploadNavMenuList: (state) => {
         state.navMenus = state.navMenus.filter(menu => menu.title !== UPLOAD_MENU.title);
      }
   }
});

export const getFetchNavMenuList = (state) => state.navMenuList.navMenus;

export default navMenuListSlice.reducer;

export const { addUploadNavMenuList, removeUploadNavMenuList } = navMenuListSlice.actions;