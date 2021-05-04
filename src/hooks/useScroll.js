import { useState, useEffect } from 'react'
import _ from 'lodash'

const useScroll = () => {

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    }

    window.addEventListener('scroll', _.throttle(handleScroll, 40), {
      capture: true,
      passive: true
    });
    return function cleanup() {
      window.removeEventListener('scroll', _.throttle(handleScroll, 40));
    };
  });

  return scroll;
}

export { useScroll };
