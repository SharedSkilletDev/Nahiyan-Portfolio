import { generateCompletion } from './completion';
import { findSimilarChunks } from './faissRetrieval';
import { findBestResponse } from './fallbackResponses';

export async function ragQuery(query: string): Promise<string> {
  try {
    console.log('Processing RAG query:', query);
    
    // Find relevant chunks using the FAISS-based retrieval
    const relevantChunks = findSimilarChunks(query, 5);
    console.log(`Found ${relevantChunks.length} relevant chunks`);
    
    // Create context from relevant chunks
    const context = relevantChunks.map(chunk => chunk.text).join('\n\n');
    
    // Generate response using the context
    const prompt = `You are Nahiyan Bin Noor's AI assistant. Use the following information about Nahiyan to answer the user's question accurately and helpfully. If the information isn't available in the context, politely say so and suggest contacting Nahiyan directly.

Context about Nahiyan:
${context}

User Question: ${query}

Please provide a helpful and accurate response based on the information provided:`;

    try {
      const response = await generateCompletion(prompt);
      console.log('Completion generated successfully');
      return response;
    } catch (error) {
      console.warn('Completion generation failed, using fallback:', error.message);
      // Fall back to pattern matching if completion fails
      return findBestResponse(query);
    }
    
  } catch (error) {
    console.error('RAG query failed:', error);
    console.log('Using fallback response system');
    return findBestResponse(query);
  }
}