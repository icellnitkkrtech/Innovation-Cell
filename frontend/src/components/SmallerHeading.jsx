import React from "react";
import { useScramble } from "use-scramble";

const SmallerHeading = (props) => {
  const { ref, replay } = useScramble({
    text: props.title,
    speed: 0.5,
    step: 2,
    tick: 4,
  });
  
  return (
    <div className="px-2">
      <a
        ref={ref}
        onMouseEnter={replay}
        className="text-white mb-4 font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl inline-block"
        href="#"
        onClick={(e) => e.preventDefault()}
      >
        {props.title}
      </a>
    </div>
  );
};

export default SmallerHeading;
