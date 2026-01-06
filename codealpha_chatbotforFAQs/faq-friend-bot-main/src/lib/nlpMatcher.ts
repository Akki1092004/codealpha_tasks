import { FAQ, faqData } from "@/data/faqData";

// Stop words to filter out
const stopWords = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "must", "shall", "can", "need", "dare",
  "ought", "used", "to", "of", "in", "for", "on", "with", "at", "by",
  "from", "up", "about", "into", "over", "after", "i", "me", "my",
  "myself", "we", "our", "ours", "you", "your", "yours", "he", "him",
  "his", "she", "her", "hers", "it", "its", "they", "them", "their",
  "what", "which", "who", "whom", "this", "that", "these", "those",
  "am", "been", "being", "and", "but", "if", "or", "because", "as",
  "until", "while", "just", "only", "own", "same", "so", "than", "too",
  "very", "s", "t", "just", "don", "now", "d", "ll", "m", "o", "re",
  "ve", "y", "ain", "aren", "couldn", "didn", "doesn", "hadn", "hasn",
  "haven", "isn", "ma", "mightn", "mustn", "needn", "shan", "shouldn",
  "wasn", "weren", "won", "wouldn", "please", "thanks", "thank", "hi",
  "hello", "hey"
]);

// Tokenize and clean text
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 1 && !stopWords.has(word));
}

// Stem a word (simple suffix removal)
function stem(word: string): string {
  const suffixes = ["ing", "ed", "er", "est", "ly", "tion", "ness", "ment", "ful", "less", "ous", "ive", "able", "ible"];
  for (const suffix of suffixes) {
    if (word.length > suffix.length + 2 && word.endsWith(suffix)) {
      return word.slice(0, -suffix.length);
    }
  }
  return word;
}

// Process text: tokenize and stem
export function processText(text: string): string[] {
  return tokenize(text).map(stem);
}

// Calculate cosine similarity between two word arrays
function cosineSimilarity(a: string[], b: string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  const allWords = new Set([...setA, ...setB]);
  
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  for (const word of allWords) {
    const inA = setA.has(word) ? 1 : 0;
    const inB = setB.has(word) ? 1 : 0;
    dotProduct += inA * inB;
    magnitudeA += inA * inA;
    magnitudeB += inB * inB;
  }
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

// Calculate keyword match score
function keywordMatchScore(queryTokens: string[], faq: FAQ): number {
  const querySet = new Set(queryTokens);
  const faqKeywords = new Set(faq.keywords.map(k => stem(k.toLowerCase())));
  
  let matches = 0;
  for (const token of querySet) {
    if (faqKeywords.has(token)) matches++;
  }
  
  return matches / Math.max(querySet.size, 1);
}

export interface MatchResult {
  faq: FAQ;
  score: number;
  confidence: "high" | "medium" | "low" | "none";
}

// Find the best matching FAQ for a query
export function findBestMatch(query: string): MatchResult | null {
  const queryTokens = processText(query);
  
  if (queryTokens.length === 0) {
    return null;
  }
  
  let bestMatch: MatchResult | null = null;
  let highestScore = 0;
  
  for (const faq of faqData) {
    // Process FAQ question
    const faqQuestionTokens = processText(faq.question);
    
    // Calculate different similarity scores
    const questionSimilarity = cosineSimilarity(queryTokens, faqQuestionTokens);
    const keywordScore = keywordMatchScore(queryTokens, faq);
    
    // Combined score with weights
    const combinedScore = (questionSimilarity * 0.4) + (keywordScore * 0.6);
    
    if (combinedScore > highestScore) {
      highestScore = combinedScore;
      
      let confidence: "high" | "medium" | "low" | "none";
      if (combinedScore >= 0.5) confidence = "high";
      else if (combinedScore >= 0.3) confidence = "medium";
      else if (combinedScore >= 0.15) confidence = "low";
      else confidence = "none";
      
      bestMatch = {
        faq,
        score: combinedScore,
        confidence
      };
    }
  }
  
  return bestMatch;
}

// Get suggested FAQs based on category
export function getSuggestionsByCategory(category: string): FAQ[] {
  return faqData.filter(faq => faq.category === category).slice(0, 3);
}

// Get greeting response
export function isGreeting(text: string): boolean {
  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy", "greetings"];
  const lowerText = text.toLowerCase().trim();
  return greetings.some(g => lowerText.includes(g)) && text.length < 30;
}
