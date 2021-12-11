import { useState, useEffect } from 'react'
import _ from 'lodash'

// TODO: this should call useRef in here and return a ref
const useReveal = ({ edge, gap, ref }) => {

  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bounds = ref.current.getBoundingClientRect();
      const viewPoint = bounds[edge] + gap;
      if (viewPoint < window.innerHeight) {
        setIsRevealed(true);
        window.removeEventListener('scroll', _.throttle(handleScroll, 120));
      }
    }

    window.addEventListener('scroll', _.throttle(handleScroll, 40), {
      capture: true,
      passive: true
    });

    return function cleanup() {
      window.removeEventListener('scroll', _.throttle(handleScroll, 120));
    };
  });

  return isRevealed;

}

export { useReveal };
