import { useState, useRef, useEffect } from 'react';

interface UseLazyImageProps {
  src: string;
  alt: string;
  threshold?: number;
}

export function useLazyImage({ src, alt, threshold = 0.1 }: UseLazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const imgProps = {
    ref: imgRef,
    src: isInView ? src : undefined,
    alt,
    loading: 'lazy' as const,
    onLoad: () => setIsLoaded(true),
    style: {
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  };

  return { imgProps, isLoaded, isInView };
}