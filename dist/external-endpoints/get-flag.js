"use strict";
const getFlagUrl = require("../api-handling/flag-handling");
const getCountry = require("../database-handling/get-country");
(async () => {
    try {
        const country = getCountry(); // Fetching country data
        const myCountry = "FR"; // Example country code
        const flagObject = await getFlagUrl(myCountry); // Adjust the type based on actual response structure
        console.log(flagObject.url);
    }
    catch (error) {
        console.error("Error fetching flag:", error);
    }
})();
