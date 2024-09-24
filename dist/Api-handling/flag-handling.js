"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFlagUrl = async (countryCode) => {
    const response = await fetch(`https://flagsapi.com/${countryCode}/flat/64.png`);
    return response;
};
module.exports = getFlagUrl;
