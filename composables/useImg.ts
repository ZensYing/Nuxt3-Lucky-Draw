export const useImg = (img: string) => {
  const baseUrl = useRuntimeConfig().public.API_TC_BASE_URL;
  return baseUrl + '/assets/' + img;
};
