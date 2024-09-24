"use strict";
const getCountry = require("./database-handling/get-country");
// Call the getCountry function
const asyncGetCountry = async () => {
    await getCountry();
};
asyncGetCountry();
// console.log("I am in index.ts");
