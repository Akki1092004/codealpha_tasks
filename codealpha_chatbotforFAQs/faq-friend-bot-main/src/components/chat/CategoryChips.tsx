import { motion } from "framer-motion";
import { categories } from "@/data/faqData";
import { 
  Truck, 
  RotateCcw, 
  User, 
  Package, 
  CreditCard, 
  HeadphonesIcon,
  LucideIcon 
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  Shipping: Truck,
  Returns: RotateCcw,
  Account: User,
  Products: Package,
  Payment: CreditCard,
  Support: HeadphonesIcon,
};

interface CategoryChipsProps {
  onSelect: (category: string) => void;
}

export function CategoryChips({ onSelect }: CategoryChipsProps) {
  return (
    <div className="px-4 py-3">
      <p className="mb-3 text-sm font-medium text-muted-foreground">
        Quick topics:
      </p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => {
          const Icon = categoryIcons[category] || Package;
          return (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(category)}
              className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="h-4 w-4" />
              {category}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
