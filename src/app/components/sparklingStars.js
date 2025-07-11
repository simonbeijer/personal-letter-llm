"use client";
import { useState } from "react";

export default function SparklingStars({ className = "h-6 w-6 text-yellow-500" }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-block"
    >
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        {/* Main large star - always visible */}
        <path d="M12 2l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5L12 2z" />
        
        {/* Small star top right - always in DOM, visibility controlled by CSS */}
        <path 
          d="M19 3l0.8 1.6 1.6 0.4-1.2 1.2 0.4 1.6-1.6-0.8-1.6 0.8 0.4-1.6-1.2-1.2 1.6-0.4L19 3z" 
          style={{
            opacity: isHovered ? 0.8 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
        </path>
        
        {/* Small star bottom left - always in DOM, visibility controlled by CSS */}
        <path 
          d="M5 19l0.8 1.6 1.6 0.4-1.2 1.2 0.4 1.6-1.6-0.8-1.6 0.8 0.4-1.6-1.2-1.2 1.6-0.4L5 19z" 
          style={{
            opacity: isHovered ? 0.6 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
        </path>
        
        {/* Tiny star top left - always in DOM, visibility controlled by CSS */}
        <path 
          d="M3 5l0.5 1 1 0.25-0.75 0.75 0.25 1-1-0.5-1 0.5 0.25-1L1.5 6.25l1-0.25L3 5z" 
          style={{
            opacity: isHovered ? 0.4 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite" />
        </path>
        
        {/* Tiny star bottom right - always in DOM, visibility controlled by CSS */}
        <path 
          d="M21 19l0.5 1 1 0.25-0.75 0.75 0.25 1-1-0.5-1 0.5 0.25-1-0.75-0.75 1-0.25L21 19z" 
          style={{
            opacity: isHovered ? 0.5 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}