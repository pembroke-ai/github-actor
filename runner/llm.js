import OpenAI from "openai";
import { prompt } from "./prompt.js";

const openai = new OpenAI();

export const getCommands = async function () {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "user", content: `${prompt}`
            }
        ],
        response_format: { type: "json_object" },
        model: "gpt-4-1106-preview",
        temperature: 0
    });

    const commands = completion.choices[0].message.content;
    console.log(commands)

    return completion.choices[0].message.content;
}


// getCommands()