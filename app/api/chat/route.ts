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
    console.log("messages", messages)
    if(messages[0]){
      messages[0].content = `${ messages[0].content} and please return in the list format of "(Recipe Name): (short description of recipe)", and at the end give a interesting historical fact about one of the recipes` 
    }

    if(messages[1]){
      const recipeNumber = messages[1].content
      messages[1].content = `Please give me the detailed recipe for #${recipeNumber} in the format "** Recipe: (Recipe Name ** /n ** Description: (description) ** /n ** Ingredients: (list of ingredients), ** /n ** Technique: (detailed technique) **`
    }

    console.log("messages", messages)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
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