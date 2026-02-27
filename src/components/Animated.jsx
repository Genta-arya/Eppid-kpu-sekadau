import React from "react";
import AnimatedContent from "./AnimatedContent";

const Animated = ({ children, direction  , distance, reverse , scale}) => {
  return (
    <AnimatedContent
      distance={distance || 100}
      direction={direction}
      reverse={reverse || false}
      duration={2}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={scale || 1}
      threshold={0.1}
      delay={0}
      
      
    >


      {children}
     
    </AnimatedContent>
  );
};

export default Animated;
