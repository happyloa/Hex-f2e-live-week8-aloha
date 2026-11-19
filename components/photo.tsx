import type { ImgHTMLAttributes } from "react";

type PhotoProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet"
> & { asset: string; priority?: boolean };

const largeImages = new Set(["index-banner", "login", "rachada1"]);
const destinationImages = new Set([
  "osaka",
  "kyoto",
  "reykjavic",
  "paris",
  "roman",
  "bangkok",
]);

export function Photo({
  asset,
  alt = "",
  priority = false,
  sizes,
  ...props
}: PhotoProps) {
  const widths =
    asset === "profile"
      ? [128]
      : largeImages.has(asset)
        ? [400, 800, 1280]
        : destinationImages.has(asset)
          ? [320, 640]
          : [320, 480, 640];
  const src = (width: number) => "/img/" + asset + "-" + width + ".webp";
  return (
    <img
      src={src(widths[1] ?? widths[0])}
      srcSet={
        widths.length > 1
          ? widths.map((width) => src(width) + " " + width + "w").join(", ")
          : undefined
      }
      sizes={sizes ?? "(min-width: 768px) 360px, 75vw"}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "auto" : "async"}
      {...props}
    />
  );
}
