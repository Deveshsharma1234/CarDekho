// utils/getBgClass.js

export default function getBgClass(pathname) {
  if (pathname.startsWith("/admin")) {
    return "bg-gradient-to-br from-black to-teal-600 ";
  }
  if (pathname.startsWith("/")) {
    return "bg-gradient-to-br from-black to-pink-950 ";
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

