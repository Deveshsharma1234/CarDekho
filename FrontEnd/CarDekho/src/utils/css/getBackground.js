// utils/getBgClass.js

export default function getBgClass(pathname) {
  if (pathname.startsWith("/admin")) {
    return "bg-gradient-to-br from-black to-teal-600 ";
  }
  if (pathname.startsWith("/")) {
    return "bg-gradient-to-br from-black to-pink-950 ";
    // return "bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400";
    // return "bg-gradient-to-br from-rose-200 via-pink-200 to-fuchsia-300";
    // return "bg-gradient-to-br from-orange-200 via-pink-200 to-rose-300";
    // return "bg-gradient-to-br from-pink-700 via-pink-800 to-pink-900";
    // return "bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800";
  }
  
  
  return "from-black to-pink-950"; // default
}


export  function getCustomCursorBgClass(pathname) {
  if (pathname.startsWith("/admin")) {
    return "bg-gradient-to-br from-black via-teal-950 to-yellow-600 ";
  }
  if (pathname.startsWith("/")) {
    return "bg-gradient-to-br from-black via-pink-950 to-yellow-600 ";
  }
  
  
  return "bg-gradient-to-br from-black via-pink-950 to-yellow-600"; // default
}



export const getGradianShiftClass = () => "animated-gradient-text";
