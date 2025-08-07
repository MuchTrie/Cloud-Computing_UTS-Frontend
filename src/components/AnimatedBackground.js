import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import '../styles/animatedBackground.css';

function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Create animated particles - simplified version
  const particles = Array.from({ length: 8 }, (_, i) => {
    const size = Math.random() * 25 + 10;
    const initialX = Math.random() * 100;
    const initialY = Math.random() * 100;
    const delay = Math.random() * 2000;
    const duration = Math.random() * 12000 + 15000;
    
    const springProps = useSpring({
      from: { 
        left: `${initialX}%`, 
        top: `${initialY}%`,
        opacity: 0,
        transform: 'scale(0.3) rotate(0deg)'
      },
      to: async (next) => {
        // Loop animation forever
        while (1) {
          await next({ 
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            opacity: Math.random() * 0.6 + 0.1,
            transform: `scale(${Math.random() * 0.7 + 0.3}) rotate(${Math.random() * 360}deg)`,
            config: { duration: duration }
          });
        }
      },
      delay: delay,
      config: { duration: duration }
    });
    
    return (
      <animated.div 
        key={i} 
        className="particle"
        style={{
          ...springProps,
          width: size,
          height: size,
          backgroundColor: i % 3 === 0 ? 'rgba(255, 0, 0, 0.05)' : 
                          i % 3 === 1 ? 'rgba(255, 255, 255, 0.03)' : 
                          'rgba(150, 0, 0, 0.04)'
        }}
      />
    );
  });

  // Static gradient background instead of cursor-following
  const gradientProps = {
    background: `radial-gradient(circle at 50% 50%, 
                rgba(40, 0, 0, 0.6) 0%, 
                rgba(20, 0, 0, 0.4) 30%, 
                rgba(10, 0, 0, 0.3) 50%,
                rgba(0, 0, 0, 0.8) 70%)`,
  };

  return (
    <div className="animated-background-wrapper">
      <div className="animated-background" style={gradientProps} />
      <div className="particles-container">
        {particles}
      </div>
    </div>
  );
}

export default AnimatedBackground;
