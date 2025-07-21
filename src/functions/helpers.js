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
      weekday: 'short',    // Day of the week (e.g., "Saturday")
      year: 'numeric',    // Full year (e.g., "2025")
      month: 'short',      // Full month (e.g., "April")
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
