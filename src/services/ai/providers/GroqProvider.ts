import { AIProvider } from "@/types/AIProvider";
import type { OptimizedRequest } from "@/types/OptimizedRequest";

export class GroqProvider implements AIProvider {
  name = "Groq";

  async generateItinerary(payload: OptimizedRequest, prompt: string): Promise<string> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Groq API key is missing");

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: JSON.stringify(payload) },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Groq API Error:", errorText);
      throw new Error(`Groq API Error: ${res.statusText}`);
    }

    const data = await res.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from Groq");
    }

    // Return the raw text. The FallbackManager will pass this to the ResponseValidator.
    return content;
  }
}
