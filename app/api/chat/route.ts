import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
 
export const runtime = 'edge';
 
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if(messages[0]){
      messages[0].content = `${ messages[0].content} and please return in the list format of "(Recipe Name):/n (short description of recipe) /n" /n at the end give a interest historical fact about one of the recipes` 
    }

    if(messages[1]){
      const recipeNumber = messages[1].content
      messages[1].content = `Please give me #${recipeNumber} in the format "Recipe: (Recipe Name) /n /n Description: (description) /n /n Ingredients: (list of ingredients), /n /n Technique: (detailed technique)`
    }


    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
      // max_tokens: 50,
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