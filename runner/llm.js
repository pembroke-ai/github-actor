import OpenAI from "openai";
import { basePrompt } from "./prompt.js";
import "dotenv/config.js";

const openai = new OpenAI();
let prompt;
// prompt = basePrompt("Build a reverse proxy API");

export const getCommands = async function (
  gptPrompt = prompt,
  olderMsgs = null
) {
  const messages = olderMsgs
    ? [
        ...olderMsgs,
        {
          role: "user",
          content: `${gptPrompt}`,
        },
      ]
    : [
        {
          role: "user",
          content: `${gptPrompt}`,
        },
      ];
  console.log("messages: ", messages);
  const completion = await openai.chat.completions.create({
    messages,
    response_format: { type: "json_object" },
    model: "gpt-4-1106-preview",
    temperature: 0,
  });

  const res = { content: completion.choices[0].message.content, messages };
  console.log("res: ", res);
  return res;
};

// getCommands(prompt);
