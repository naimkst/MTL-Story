export const getImage = (image: any) => {
  return image?.data
    ? process.env.NEXT_PUBLIC_API_BASE_URL + image?.data?.attributes?.url
    : "";
};
export const getHeight = (image: any) => {
  return image?.data ? image?.data?.attributes?.height : 100;
};
export const getWidth = (image: any) => {
  return image?.data ? image?.data?.attributes?.width : 100;
};
export const getLocalStorageData = (key: any) => {
  try {
    let data = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    data = JSON.parse(data!);
    return data;
  } catch (error) {
    console.log(error);
  }
};
