interface SEOImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  loading?: "lazy" | "eager";
}

export default function SEOImage({
  src,
  alt,
  title,
  className = "",
  width,
  height,
  loading = "lazy"
}: SEOImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      title={title}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
    />
  );
}