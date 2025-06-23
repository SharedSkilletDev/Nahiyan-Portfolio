const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface EmbeddingRequest {
  text: string;
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

    const { text }: EmbeddingRequest = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
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

    console.log("Making request to EURI API for embedding...");
    
    const response = await fetch("https://api.euri.ai/v1/embeddings", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: text,
        model: "text-embedding-ada-002",
      }),
    });

    console.log("EURI API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("EURI API error response:", errorData);
      
      let errorMessage = "Failed to create embedding";
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

    if (data?.data?.[0]?.embedding) {
      console.log("Successfully created embedding");
      return new Response(
        JSON.stringify({ embedding: data.data[0].embedding }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      console.error("Invalid response structure:", data);
      return new Response(
        JSON.stringify({ 
          error: "Invalid response format from embedding API",
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