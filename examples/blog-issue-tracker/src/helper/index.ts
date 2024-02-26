export const groupBy = (arr: string[]) => {
  const retVal: { [key: string]: number } = {};
  for (const key of arr) {
    if (retVal[key]) {
      retVal[key] += 1;
    } else {
      retVal[key] = 1;
    }
  }
  return retVal;
};
