export const getFlagUrl = async (countryCode: string) => {
  const response = await fetch(
    `https://flagsapi.com/${countryCode}/flat/64.png`
  );
  console.log(response);
};
