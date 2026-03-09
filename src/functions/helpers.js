import {
   MultiplePages,
   ProfileCircle,
   SelectFace3d,
   CloudUpload,
} from "iconoir-react";

export const getApiPath = () => import.meta.env.VITE_API_BASE_URL;

export const toHumanReadableDates = (timestamp) => {

   const date = new Date(timestamp);

   // Format it to a human-readable string
   const humanReadable = date.toLocaleString('en-US', {
      weekday: 'long',    // Day of the week (e.g., "Saturday")
      year: 'numeric',    // Full year (e.g., "2025")
      month: 'long',      // Full month (e.g., "April")
      day: 'numeric',     // Day of the month (e.g., "12")
   });

   return humanReadable;
}

export const scrollToTop = () => {
   window.scrollTo({
      top: 0,
      behavior: 'smooth'
   });
}

export const iconMap = {
   MultiplePages,
   ProfileCircle,
   SelectFace3d,
   CloudUpload,
};

export const getLoginUserId = () => {
   return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))?.id : null;
};

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const capitalizeFirstLetter = (string) => {
   if (!string || string.length === 0) {
      return ""; // Handles empty strings safely
   }
   return string.charAt(0).toUpperCase() + string.slice(1);
}