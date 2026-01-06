import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

export function ChatHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary to-primary/90 px-6 py-5 text-primary-foreground"
      style={{ background: "var(--gradient-header)" }}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/20 backdrop-blur-sm">
            <Bot className="h-6 w-6" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground"
          >
            <Sparkles className="h-3 w-3 text-primary" />
          </motion.div>
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">FAQ Assistant</h1>
          <p className="text-sm text-primary-foreground/80">
            Ask me anything about our services
          </p>
        </div>
      </div>
    </motion.div>
  );
}
