import type { AIProvider } from "@/types/AIProvider";
import type { TripResponse } from "@/types/itinerary";
import type { OptimizedRequest } from "@/types/OptimizedRequest";

export class GeminiProvider implements AIProvider {
  name = "Gemini";

  async generateItinerary(payload: OptimizedRequest, prompt: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Gemini API key is missing");

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      system_instruction: {
        parts: [{ text: prompt }],
      },
      contents: [
        {
          parts: [{ text: JSON.stringify(payload) }],
        },
      ],
      generationConfig: {
        response_mime_type: "application/json",
      },
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      throw new Error(`Gemini API Error: ${res.statusText}`);
    }

    const data = await res.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      throw new Error("Empty response from Gemini");
    }

    // Return the raw text. The FallbackManager will pass this to the ResponseValidator.
    return rawContent;
  }
}
