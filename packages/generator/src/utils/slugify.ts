export type SlugifyOptions = {
  input: string;
};

export const slugify = ({ input }: SlugifyOptions) => {
  return input?.toLowerCase().replace(/\s/g, "-");
};
