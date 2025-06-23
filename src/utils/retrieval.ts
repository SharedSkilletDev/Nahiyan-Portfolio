// Simple cosine similarity function
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Simple keyword-based similarity as fallback
function keywordSimilarity(query: string, text: string): number {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const textWords = text.toLowerCase().split(/\s+/);
  
  let matches = 0;
  for (const queryWord of queryWords) {
    if (textWords.some(textWord => textWord.includes(queryWord) || queryWord.includes(textWord))) {
      matches++;
    }
  }
  
  return matches / queryWords.length;
}

export function findSimilarChunks(
  query: string,
  chunks: Array<{ text: string; embedding?: number[] }>,
  queryEmbedding?: number[],
  topK: number = 5
): Array<{ text: string; score: number }> {
  const scoredChunks = chunks.map(chunk => {
    let score = 0;
    
    // Use embedding similarity if available
    if (queryEmbedding && chunk.embedding) {
      score = cosineSimilarity(queryEmbedding, chunk.embedding);
    } else {
      // Fallback to keyword-based similarity
      score = keywordSimilarity(query, chunk.text);
    }
    
    return {
      text: chunk.text,
      score
    };
  });
  
  // Sort by score and return top K
  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}