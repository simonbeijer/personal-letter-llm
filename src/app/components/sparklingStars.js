"use client";

export default function SparklingStars({ className = "h-6 w-6 text-yellow-500", isHovered = false }) {
  return (
    <div className="inline-block">
      <svg className={className} fill="currentColor" viewBox="0 0 32 32">
        {/* Main large star - always visible */}
        <path d="M16 4l3 6.5L26 12l-5 5 1.5 7-6.5-3.5L9 24l1.5-7L5 12l7-1.5L16 4z" />
        
        {/* Small star top right */}
        <path 
          d="M25 6l1.2 2.4 2.4 0.6-1.8 1.8 0.6 2.4-2.4-1.2-2.4 1.2 0.6-2.4L21.4 9l2.4-0.6L25 6z" 
          style={{
            opacity: isHovered ? 0.8 : 0,
            transform: isHovered ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-180deg)',
            transformOrigin: 'center',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transitionDelay: isHovered ? '0.1s' : '0s'
          }}
        />
        
        {/* Small star bottom left */}
        <path 
          d="M7 23l1.2 2.4 2.4 0.6-1.8 1.8 0.6 2.4-2.4-1.2-2.4 1.2 0.6-2.4L3.4 26l2.4-0.6L7 23z" 
          style={{
            opacity: isHovered ? 0.7 : 0,
            transform: isHovered ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(180deg)',
            transformOrigin: 'center',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transitionDelay: isHovered ? '0.2s' : '0s'
          }}
        />
        
        {/* Tiny star top left */}
        <path 
          d="M8 8l0.8 1.6 1.6 0.4-1.2 1.2 0.4 1.6-1.6-0.8-1.6 0.8 0.4-1.6L4.8 10l1.6-0.4L8 8z" 
          style={{
            opacity: isHovered ? 0.6 : 0,
            transform: isHovered ? 'scale(1) rotate(0deg)' : 'scale(0.2) rotate(-90deg)',
            transformOrigin: 'center',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transitionDelay: isHovered ? '0.3s' : '0s'
          }}
        />
        
        {/* Tiny star bottom right */}
        <path 
          d="M24 24l0.8 1.6 1.6 0.4-1.2 1.2 0.4 1.6-1.6-0.8-1.6 0.8 0.4-1.6-1.2-1.2 1.6-0.4L24 24z" 
          style={{
            opacity: isHovered ? 0.5 : 0,
            transform: isHovered ? 'scale(1) rotate(0deg)' : 'scale(0.2) rotate(90deg)',
            transformOrigin: 'center',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transitionDelay: isHovered ? '0.4s' : '0s'
          }}
        />
      </svg>
    </div>
  );
}