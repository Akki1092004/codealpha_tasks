import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { CategoryChips } from "./CategoryChips";
import { findBestMatch, isGreeting, getSuggestionsByCategory } from "@/lib/nlpMatcher";
import { faqData } from "@/data/faqData";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  content: "👋 Hi there! I'm your FAQ Assistant. Ask me any question about shipping, returns, accounts, products, payments, or support. You can also tap a topic below to explore common questions!",
  sender: "bot",
  timestamp: new Date(),
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const addBotMessage = useCallback((content: string, confidence?: Message["confidence"]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "bot",
      timestamp: new Date(),
      confidence,
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const handleSendMessage = useCallback((content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setShowChips(false);
    setIsTyping(true);

    // Simulate processing delay
    setTimeout(() => {
      setIsTyping(false);

      // Check for greeting
      if (isGreeting(content)) {
        addBotMessage("Hello! 😊 How can I help you today? Feel free to ask any question about our services, or tap on a topic below to explore.");
        setShowChips(true);
        return;
      }

      // Find best matching FAQ
      const result = findBestMatch(content);

      if (result && result.confidence !== "none") {
        let response = result.faq.answer;
        
        if (result.confidence === "low") {
          response = `I found a related answer that might help:\n\n${result.faq.answer}\n\nIf this doesn't answer your question, try rephrasing or contact our support team!`;
        }
        
        addBotMessage(response, result.confidence);
      } else {
        // No good match found
        addBotMessage(
          "I'm not sure I understand your question. Could you try rephrasing it? Here are some topics I can help with:\n\n• Shipping & delivery times\n• Returns & refunds\n• Account management\n• Product information\n• Payment methods\n• Customer support",
          "none"
        );
        setShowChips(true);
      }
    }, 800 + Math.random() * 500);
  }, [addBotMessage]);

  const handleCategorySelect = useCallback((category: string) => {
    const suggestions = getSuggestionsByCategory(category);
    const categoryFaqs = faqData.filter(f => f.category === category);
    
    // Add a message showing the category was selected
    const userMessage: Message = {
      id: Date.now().toString(),
      content: `Tell me about ${category}`,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setShowChips(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const questionsPreview = categoryFaqs
        .slice(0, 4)
        .map((faq, i) => `${i + 1}. ${faq.question}`)
        .join("\n");
      
      addBotMessage(
        `Here are common questions about ${category}:\n\n${questionsPreview}\n\nJust ask any of these questions, or type your own question about ${category.toLowerCase()}!`
      );
    }, 600);
  }, [addBotMessage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mx-auto flex h-[700px] max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-card shadow-chat"
    >
      <ChatHeader />
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <ChatMessage key={message.id} message={message} index={index} />
          ))}
        </AnimatePresence>
        
        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Category chips */}
      <AnimatePresence>
        {showChips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-secondary/30"
          >
            <CategoryChips onSelect={handleCategorySelect} />
          </motion.div>
        )}
      </AnimatePresence>

      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </motion.div>
  );
}
