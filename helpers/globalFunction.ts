export const getImage = (image: any) => {
  console.log(image?.data?.attributes?.url || "");
  return image?.data
    ? process.env.NEXT_PUBLIC_API_BASE_URL + image?.data?.attributes?.url
    : "";
};
