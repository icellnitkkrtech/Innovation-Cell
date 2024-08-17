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
    <div>
      <a
        ref={ref}
        onMouseEnter={replay}
        className="text-white mb-4 font-md lg:text-4xl md:text-4xl sm:text-3xl text-2xl "
        href="#"
      >
        {props.title}
      </a>
    </div>
  );
};

export default SmallerHeading;
