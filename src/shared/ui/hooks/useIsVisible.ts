import { useEffect, useRef, useState } from 'react';

const useIsVisible = (isInitiallyVisible = false) => {
  const [isVisible, setIsVisible] = useState<boolean>(isInitiallyVisible);

  const ref = useRef<HTMLDivElement>(null);
  const handleRef = useRef(setIsVisible);

  const handleClick = (e: MouseEvent) => {
    if (ref.current?.contains(e.target as Node)) return;
    if (handleRef.current) handleRef.current(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return { isVisible, setIsVisible, ref };
};

export default useIsVisible;
