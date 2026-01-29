const getImageUrl = (imageRef: string) => {
  const sanityCdnUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/`;
  const [type, assetId, dimensions, format] = imageRef.split("-");
  return `${sanityCdnUrl}${assetId}-${dimensions}.${format}`;
};

export default getImageUrl;
