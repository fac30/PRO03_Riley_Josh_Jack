const databaseCountryFunc = require("./database-handling/get-country");

// Call the getCountry function
const getCountryFour = async () => {
  const myCountry = await databaseCountryFunc();
  console.log(myCountry);
};

getCountryFour();

// console.log("I am in index.ts");
