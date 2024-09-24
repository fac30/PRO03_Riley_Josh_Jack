"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCountry = require("../database-handling/get-country");
const getRandomNumber = () => {
    return Math.floor(Math.random() * 198);
};
const getRandomCountry = async () => {
    const randomNumber = getRandomNumber();
    const randomCountry = await getCountry(randomNumber);
    console.log(randomCountry);
    return randomCountry;
};
getRandomCountry();
module.exports = getRandomCountry;
