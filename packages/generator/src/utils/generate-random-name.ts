import humanId from "human-id";

export const generateRandomName = () => {
  return humanId({
    separator: "-",
    capitalize: false,
    adjectiveCount: 1,
  });
};
