// Performance monitoring utilities for SEO optimization

export function measurePerformance() {
  if (typeof window === 'undefined') return;

  // Measure Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
      if (entry.entryType === 'first-input') {
        const fidEntry = entry as any;
        console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
      }
      if (entry.entryType === 'layout-shift') {
        const clsEntry = entry as any;
        if (!clsEntry.hadRecentInput) {
          console.log('CLS:', clsEntry.value);
        }
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (e) {
    // Fallback for browsers that don't support all entry types
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // Measure Time to First Byte and other metrics
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    console.log('Performance Metrics:', {
      'TTFB': navigation.responseStart - navigation.requestStart,
      'DOM Load': navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      'Page Load': navigation.loadEventEnd - navigation.loadEventStart,
      'Total Load Time': navigation.loadEventEnd - navigation.fetchStart
    });
  });
}

export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = [
    '/attached_assets/Untitled design.png',
    '/attached_assets/rectlogo.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

export function optimizeImages() {
  if (typeof window === 'undefined') return;

  // Add intersection observer for lazy loading
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

export function initPerformanceOptimizations() {
  measurePerformance();
  preloadCriticalResources();
  optimizeImages();
}