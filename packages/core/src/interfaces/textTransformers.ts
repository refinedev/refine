export type TextTransformers = {
  /**
   * Convert a camelized/dasherized/underscored string into a humanized one
   * @example
   * humanize("some_name") => "Some name"
   */
  humanize?: (text: string) => string;
  /**
   * Pluralize a word
   * @example
   * plural('regex') => "regexes"
   */
  plural?: (word: string) => string;
  /**
   * Singularize a word
   * @example
   * singular('singles') => "single"
   */
  singular?: (word: string) => string;
};
