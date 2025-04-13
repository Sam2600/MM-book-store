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