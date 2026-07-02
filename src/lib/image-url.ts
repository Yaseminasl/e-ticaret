export function getProductImageUrl(imageUrl: string, options: string) {
  if (!imageUrl.includes("images.unsplash.com")) {
    return imageUrl;
  }

  const separator = imageUrl.includes("?") ? "&" : "?";

  return `${imageUrl}${separator}${options}`;
}
