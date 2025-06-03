import { useEffect } from 'react';

interface LocalSEOProps {
  businessName: string;
  streetAddress?: string;
  cityState: string;
  zipCode?: string;
  phone: string;
  website: string;
  serviceAreas: string[];
  businessType?: string;
}

export default function LocalSEO({
  businessName,
  streetAddress,
  cityState,
  zipCode,
  phone,
  website,
  serviceAreas,
  businessType = "RealEstateAgent"
}: LocalSEOProps) {
  useEffect(() => {
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": businessType,
      "name": businessName,
      "telephone": phone,
      "url": website,
      "address": {
        "@type": "PostalAddress",
        ...(streetAddress && { "streetAddress": streetAddress }),
        "addressLocality": cityState.split(', ')[0],
        "addressRegion": cityState.split(', ')[1],
        ...(zipCode && { "postalCode": zipCode }),
        "addressCountry": "US"
      },
      "areaServed": serviceAreas.map(area => ({
        "@type": "Place",
        "name": area
      })),
      "priceRange": "$$$",
      "openingHours": "Mo-Su 08:00-20:00",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "35.2271",
        "longitude": "-80.8431"
      }
    };

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify(localBusinessSchema);
    schemaScript.id = 'local-business-schema';
    
    // Remove existing schema if present
    const existingSchema = document.getElementById('local-business-schema');
    if (existingSchema) {
      document.head.removeChild(existingSchema);
    }
    
    document.head.appendChild(schemaScript);

    return () => {
      const script = document.getElementById('local-business-schema');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [businessName, streetAddress, cityState, zipCode, phone, website, serviceAreas, businessType]);

  return null;
}