import { useState, useCallback } from "react";
import { ArrowRightLeft, Languages, Sparkles } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { TranslationPanel } from "@/components/TranslationPanel";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { toast } from "sonner";

const Index = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [isLoading, setIsLoading] = useState(false);

  const { speak: speakSource, isSpeaking: isSpeakingSource } = useTextToSpeech();
  const { speak: speakTarget, isSpeaking: isSpeakingTarget } = useTextToSpeech();

  const handleSwapLanguages = () => {
    if (sourceLang === "auto") {
      toast.info("Cannot swap when source is set to auto-detect");
      return;
    }
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }

    setIsLoading(true);
    setTranslatedText("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            text: sourceText,
            sourceLang,
            targetLang,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Translation failed");
      }

      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      toast.error(
        error instanceof Error ? error.message : "Translation failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, sourceLang, targetLang]);

  const handleSourceChange = (text: string) => {
    setSourceText(text);
    // Auto-translate after a short delay when user stops typing
    if (text.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate();
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else {
      setTranslatedText("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
              <Languages className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Translator</h1>
              <p className="text-sm text-muted-foreground">AI-powered language translation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Language Selection Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-4 bg-card rounded-xl shadow-soft border border-border">
            <LanguageSelector
              value={sourceLang}
              onChange={setSourceLang}
              showAutoDetect={true}
              label="From"
            />

            <button
              onClick={handleSwapLanguages}
              className="icon-button-primary mt-6 sm:mt-5"
              title="Swap languages"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>

            <LanguageSelector
              value={targetLang}
              onChange={setTargetLang}
              showAutoDetect={false}
              label="To"
            />

            <div className="flex-1" />

            <button
              onClick={handleTranslate}
              disabled={!sourceText.trim() || isLoading}
              className="mt-6 sm:mt-5 px-6 py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-soft"
            >
              <Sparkles className="w-4 h-4" />
              Translate
            </button>
          </div>

          {/* Translation Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <TranslationPanel
                value={sourceText}
                onChange={handleSourceChange}
                placeholder="Enter text to translate..."
                onSpeak={() => speakSource(sourceText, sourceLang === "auto" ? undefined : sourceLang)}
                isSpeaking={isSpeakingSource}
              />
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <TranslationPanel
                value={translatedText}
                placeholder="Translation will appear here..."
                isReadOnly
                isLoading={isLoading}
                onSpeak={() => speakTarget(translatedText, targetLang)}
                isSpeaking={isSpeakingTarget}
              />
            </div>
          </div>

          {/* Info Footer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Powered by AI • Supports 15+ languages • Free to use</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
