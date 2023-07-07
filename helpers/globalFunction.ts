export const getImage = (image: any) => {
  console.log(image?.data?.attributes?.url || "");
  return image?.data
    ? process.env.NEXT_PUBLIC_API_BASE_URL + image?.data?.attributes?.url
    : "";
};
export const getHeight = (image: any) => {
  console.log(image?.data?.attributes?.height || "");
  return image?.data ? image?.data?.attributes?.height : 100;
};
export const getWidth = (image: any) => {
  console.log(image?.data?.attributes?.width || "");
  return image?.data ? image?.data?.attributes?.width : 100;
};
