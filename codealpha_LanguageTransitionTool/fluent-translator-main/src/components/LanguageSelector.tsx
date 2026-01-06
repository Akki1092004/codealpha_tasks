import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "auto", name: "Auto-detect", flag: "🔍" },
  { code: "English", name: "English", flag: "🇺🇸" },
  { code: "Spanish", name: "Spanish", flag: "🇪🇸" },
  { code: "French", name: "French", flag: "🇫🇷" },
  { code: "German", name: "German", flag: "🇩🇪" },
  { code: "Italian", name: "Italian", flag: "🇮🇹" },
  { code: "Portuguese", name: "Portuguese", flag: "🇵🇹" },
  { code: "Russian", name: "Russian", flag: "🇷🇺" },
  { code: "Japanese", name: "Japanese", flag: "🇯🇵" },
  { code: "Korean", name: "Korean", flag: "🇰🇷" },
  { code: "Chinese", name: "Chinese", flag: "🇨🇳" },
  { code: "Arabic", name: "Arabic", flag: "🇸🇦" },
  { code: "Hindi", name: "Hindi", flag: "🇮🇳" },
  { code: "Dutch", name: "Dutch", flag: "🇳🇱" },
  { code: "Polish", name: "Polish", flag: "🇵🇱" },
  { code: "Turkish", name: "Turkish", flag: "🇹🇷" },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  showAutoDetect?: boolean;
  label: string;
}

export function LanguageSelector({
  value,
  onChange,
  showAutoDetect = false,
  label,
}: LanguageSelectorProps) {
  const filteredLanguages = showAutoDetect
    ? languages
    : languages.filter((lang) => lang.code !== "auto");

  const selectedLanguage = languages.find((lang) => lang.code === value);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full min-w-[160px] bg-secondary border-0 h-11 text-foreground font-medium">
          <SelectValue>
            <span className="flex items-center gap-2">
              <span className="text-lg">{selectedLanguage?.flag}</span>
              <span>{selectedLanguage?.name}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {filteredLanguages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className="cursor-pointer hover:bg-accent focus:bg-accent"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
