import { useState, useCallback, useRef } from "react";

export function useTextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, lang?: string) => {
    if (!text || !window.speechSynthesis) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Map language names to BCP 47 codes
    const langMap: Record<string, string> = {
      English: "en-US",
      Spanish: "es-ES",
      French: "fr-FR",
      German: "de-DE",
      Italian: "it-IT",
      Portuguese: "pt-PT",
      Russian: "ru-RU",
      Japanese: "ja-JP",
      Korean: "ko-KR",
      Chinese: "zh-CN",
      Arabic: "ar-SA",
      Hindi: "hi-IN",
      Dutch: "nl-NL",
      Polish: "pl-PL",
      Turkish: "tr-TR",
    };

    if (lang && langMap[lang]) {
      utterance.lang = langMap[lang];
    }

    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
