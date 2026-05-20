export const convertToNumberIfPossible = (value: unknown) => {
  if (typeof value === "undefined") {
    return value;
  }
  if (typeof value === "number") {
    return value;
  }
  if (typeof value !== "string") {
    return value;
  }
  const num = Number(value);
  if (`${num}` === value) {
    return num;
  }
  return value;
};
