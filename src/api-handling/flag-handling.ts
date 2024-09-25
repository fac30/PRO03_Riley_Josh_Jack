const getFlagURL = async (countryCode: string) => {
  if (!countryCode || typeof countryCode !== "string") {
    throw new Error("invalid country code");
  }
  try {
    const response = await fetch(
      `https://flagsapi.com/${countryCode}/flat/64.png`
    );
    return response.url;
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error);
  }
};

module.exports = getFlagURL;

export {};
