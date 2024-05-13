import { Article } from "../../typings/news";

export const shuffleArray = (array: Article[] | []): Article[] | [] => {
  let shuffledArray = [...array]; // create a copy of the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
