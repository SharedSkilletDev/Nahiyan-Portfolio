const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface CompletionRequest {
  prompt: string;
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { prompt }: CompletionRequest = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const apiKey = Deno.env.get("EURI_API_KEY");
    if (!apiKey) {
      console.error("EURI_API_KEY environment variable not found");
      return new Response(
        JSON.stringify({ 
          error: "EURI API key not configured",
          debug: "Environment variable EURI_API_KEY is missing"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Making request to EURI API for completion...");

    const response = await fetch("https://api.euri.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    console.log("EURI API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("EURI API error response:", errorData);
      
      let errorMessage = "Failed to generate completion";
      try {
        const parsedError = JSON.parse(errorData);
        errorMessage = parsedError.error?.message || parsedError.message || errorMessage;
      } catch (e) {
        // If parsing fails, use the raw error data
        errorMessage = errorData || errorMessage;
      }

      return new Response(
        JSON.stringify({ 
          error: errorMessage,
          status: response.status,
          debug: `EURI API returned ${response.status}: ${errorData}`
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    console.log("EURI API response structure:", Object.keys(data));

    if (data?.choices?.[0]?.message?.content) {
      console.log("Successfully generated completion");
      return new Response(
        JSON.stringify({ content: data.choices[0].message.content.trim() }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      console.error("Invalid response structure:", data);
      return new Response(
        JSON.stringify({ 
          error: "Invalid response format from completion API",
          debug: `Response structure: ${JSON.stringify(Object.keys(data))}`
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        debug: error.message || "Unknown error occurred"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});