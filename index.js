import OpenAI from "openai";
import { base_prompt } from "./prompt.js";
import "dotenv/config.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

async function main() {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: base_prompt(
          "expressJS API to create a reverser proxy for `sunbird.org`"
        ),
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log("chatCompletion: ", chatCompletion);
}

main();
