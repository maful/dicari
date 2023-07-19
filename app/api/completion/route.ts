import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const runtime = "edge";

const promptOptions = [
  "Create one technical question for",
  "Create one coding challenge question for",
  "Create one test question for",
  "Generate one question when hiring",
];

function getRandomPrompt() {
  return promptOptions[Math.floor(Math.random() * promptOptions.length)];
}

export async function POST(req: Request) {
  const { prompt } = await req.json();

  let fullPrompt = `${getRandomPrompt()} ${prompt} position`;
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    stream: true,
    temperature: 0.6,
    max_tokens: 100,
    prompt: fullPrompt,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
