import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import getCustomCursorBgClass from "../../utils/css/getBackground";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const lightRef = useRef(null);
  
  useEffect(() => {
    const moveCursor = (e) => {
      // Move main cursor dot
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
      
      // Move background gradient light with slight delay
      gsap.to(lightRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);
  
  const location = useLocation();
  return (
    <>
     
      <div
        ref={lightRef}
        className={`pointer-events-none fixed left-0 top-0 w-[200px] h-[200px] rounded-full 
          ${getCustomCursorBgClass(location.pathname)} blur-pink-950   blur-2xl transform -translate-x-1/2 -translate-y-1/2`}
      ></div>

      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 h-1 w-1 bg-pink-200 rounded shadow-lg transform -translate-x-1/2 -translate-y-1/2"
      ></div>
    </>
  );
};

export default CustomCursor;
