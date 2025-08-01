import { getValuationPrompt } from "@/prompts/valuationPrompt";
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const answers = await request.json();
    const prompt = getValuationPrompt(answers);
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    const aiResponse = JSON.parse(response.content[0].text);
    return NextResponse.json(aiResponse);
  } catch (error) {
    const message =
      error.error?.error?.message ||
      error.message ||
      "We couldn't submit your data. Please check your connection and try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
