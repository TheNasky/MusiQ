export const getHighQualityThumbnail = (url) => {
   const videoId = url.split("v=")[1];
   return `https://img.youtube.com/vi/${videoId}/0.jpg`;
 };