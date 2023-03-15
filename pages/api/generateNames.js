import { Configuration, OpenAIApi } from "openai";
let delay = (ms) => new Promise((res) => setTimeout(res, ms));
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const business = req.body.business || "";
  if (business.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a business idea",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(business),
      temperature: 0.9,
      max_tokens: 1000,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(business) {
  const capitalizedBusiness =
    business[0].toUpperCase() + business.slice(1).toLowerCase();
  return `Return a comma sperated list of four potential names for a new business. The idea for the business is: ${business}. Return an unordered list. Do not use any existing business names. We want this new business to be new and uniques. Return a comma seperated list`;
}
