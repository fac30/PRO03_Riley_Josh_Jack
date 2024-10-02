const { getOpenAIReponse } = require("../api-handling/openAI-handling");

async function getRandomFact(req: any, res: any) {
  const country = req.body.country;
  if (!country) {
    return res.status(400).json({ error: "Country is required" });
  }

  try {
    const fact = await getOpenAIReponse(country);
    res.json({ fact });
  } catch (error) {
    console.error("Error getting random fact:", error);
    res.status(500).json({ error: "Failed to fetch random fact" });
  }
}

module.exports = getRandomFact;
