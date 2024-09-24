const getCountry = require("../database-handling/get-country");

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 198);
};

const getRandomCountry = async (): Promise<{
  country: string;
  code: string;
}> => {
  const randomNumber: number = getRandomNumber();

  const randomCountry = await getCountry(randomNumber);

  console.log(randomCountry);
  return randomCountry;
};

getRandomCountry();

module.exports = getRandomCountry;

export {};
