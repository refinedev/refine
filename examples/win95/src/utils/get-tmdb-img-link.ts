export const getTMDBImgLink = (props: {
  path: string;
  width?: number;
}) => {
  return `https://image.tmdb.org/t/p/w${props?.width || 200}${props.path}`;
};
