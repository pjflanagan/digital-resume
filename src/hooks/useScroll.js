import { useState, useEffect } from 'react'
import _ from 'lodash'

const useScroll = ({ max }) => {

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!!max && window.scrollY > max) {
        window.removeEventListener('scroll', _.throttle(handleScroll, 120));
      }
      setScroll(window.scrollY);
    }

    window.addEventListener('scroll', _.throttle(handleScroll, 40));
    return function cleanup() {
      window.removeEventListener('scroll', _.throttle(handleScroll, 120));
    };
  });

  return scroll;
}

export { useScroll };
