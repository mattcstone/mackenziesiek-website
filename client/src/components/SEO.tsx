import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schema?: object;
}

export default function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  canonicalUrl,
  schema
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update keywords if provided
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Update Open Graph tags
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', ogTitle || title);
    }

    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute('content', ogDescription || description);
    }

    if (ogImage) {
      const ogImageTag = document.querySelector('meta[property="og:image"]');
      if (ogImageTag) {
        ogImageTag.setAttribute('content', ogImage);
      }
    }

    // Update canonical URL if provided
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // Add schema markup if provided
    if (schema) {
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(schemaScript);

      // Cleanup function to remove schema on unmount
      return () => {
        document.head.removeChild(schemaScript);
      };
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, schema]);

  return null;
}