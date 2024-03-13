import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = "edge";

/**
 * Handles the POST request for the chat route.
 * @param req - The request object.
 * @returns A StreamingTextResponse object.
 */
export async function POST(req: Request) {
  const regex = /^(10|[1-9])$/;
  try {
    const { messages } = await req.json();

    if (messages[0].content.includes("Please give me 10")) {
      messages[0].content = `${messages[0].content} and please return in the list format of "(Recipe Name): (short description of recipe)", and at the end give a interesting historical fact about one of the recipes`;
    }
    if (messages[2]) {
      messages[2].content = `Please give me the detailed recipe for #${messages[2].content} in the format "Recipe: (Recipe Name /n Description: (description) /n Ingredients: (list of ingredients), /n Technique: (detailed technique)`;
    }

    console.log("messages!", messages);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
      // max_tokens: 150,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}
