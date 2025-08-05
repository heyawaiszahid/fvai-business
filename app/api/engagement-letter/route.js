import { getEngagementLetterPrompt } from "@/prompts/engagementLetterPrompt";
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { answers, results, entityData } = await request.json();
    const prompt = getEngagementLetterPrompt(answers, results, entityData);
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const maxRetries = 3;
    let retryCount = 0;
    let lastError = null;

    while (retryCount < maxRetries) {
      try {
        const response = await anthropic.messages.create({
          model: "claude-3-opus-20240229",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }],
        });
        return NextResponse.json({ content: response.content[0].text });
      } catch (error) {
        lastError = error;
        retryCount++;

        const delay = Math.pow(2, retryCount) * 500;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    const message =
      lastError.error?.error?.message ||
      lastError.message ||
      "We couldn't generate your letter. Please check your connection and try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  } catch (error) {
    const message =
      error.error?.error?.message ||
      error.message ||
      "We couldn't generate your letter. Please check your connection and try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
