export const convertToNumberIfPossible = (value: unknown): number | unknown => {
  if (typeof value !== "string") {
    return value;
  }

  if (value === "") {
    return value;
  }

  const num = Number(value);
  if (!Number.isNaN(num)) {
    return num;
  }

  return value;
};
