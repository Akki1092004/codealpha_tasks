import { useState, useRef } from "react";
import { Copy, Volume2, Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface TranslationPanelProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder: string;
  isReadOnly?: boolean;
  isLoading?: boolean;
  maxLength?: number;
  onSpeak?: () => void;
  isSpeaking?: boolean;
}

export function TranslationPanel({
  value,
  onChange,
  placeholder,
  isReadOnly = false,
  isLoading = false,
  maxLength = 5000,
  onSpeak,
  isSpeaking,
}: TranslationPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleClear = () => {
    onChange?.("");
    textareaRef.current?.focus();
  };

  return (
    <div className="translate-panel h-full flex flex-col">
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg z-10">
            <Loader2 className="w-6 h-6 text-primary animate-spin-slow" />
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={isReadOnly}
          maxLength={maxLength}
          className="translate-textarea"
        />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
        <div className="flex items-center gap-1">
          {!isReadOnly && value && (
            <button
              onClick={handleClear}
              className="icon-button"
              title="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {value && onSpeak && (
            <button
              onClick={onSpeak}
              className={`icon-button ${isSpeaking ? "bg-primary text-primary-foreground" : ""}`}
              title="Listen"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
          {value && (
            <button
              onClick={handleCopy}
              className="icon-button"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {!isReadOnly && (
          <span className="text-sm text-muted-foreground">
            {value.length} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
