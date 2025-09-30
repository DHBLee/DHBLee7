import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Throttle updates to prevent excessive rerenders
    let timeoutId = null;
    const listener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMatches(media.matches);
      }, 100);
    };
    
    media.addEventListener('change', listener);
    
    return () => {
      clearTimeout(timeoutId);
      media.removeEventListener('change', listener);
    };
  }, [matches, query]);

  return matches;
}
