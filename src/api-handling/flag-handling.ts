const getFlagUrl = async (countryCode: string) => {
  const response = await fetch(
    `https://flagsapi.com/${countryCode}/flat/64.png`
  );
  return response.url;
};

module.exports = getFlagUrl;

export {};
