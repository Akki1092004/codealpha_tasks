export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export const faqData: FAQ[] = [
  // Shipping & Delivery
  {
    id: "1",
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business day delivery. International orders may take 10-14 business days depending on the destination.",
    category: "Shipping",
    keywords: ["shipping", "delivery", "time", "long", "days", "arrive", "ship", "when"]
  },
  {
    id: "2",
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free standard shipping on all orders over $50. For orders under $50, standard shipping is $5.99 and express shipping is $12.99.",
    category: "Shipping",
    keywords: ["free", "shipping", "cost", "price", "charge", "delivery"]
  },
  {
    id: "3",
    question: "Can I track my order?",
    answer: "Absolutely! Once your order ships, you'll receive an email with a tracking number. You can use this to track your package on our website or the carrier's site.",
    category: "Shipping",
    keywords: ["track", "tracking", "order", "status", "where", "package", "shipped"]
  },

  // Returns & Refunds
  {
    id: "4",
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply initiate a return through your account or contact our support team for assistance.",
    category: "Returns",
    keywords: ["return", "policy", "refund", "send back", "exchange", "days"]
  },
  {
    id: "5",
    question: "How do I return an item?",
    answer: "To return an item: 1) Log into your account, 2) Go to your orders, 3) Select the item to return, 4) Print the prepaid shipping label, 5) Pack the item securely and drop it off at any carrier location.",
    category: "Returns",
    keywords: ["return", "how", "item", "send back", "process", "steps"]
  },
  {
    id: "6",
    question: "How long do refunds take?",
    answer: "Once we receive your return, refunds are processed within 3-5 business days. The refund will appear on your original payment method within 5-10 business days after processing.",
    category: "Returns",
    keywords: ["refund", "time", "long", "money", "back", "payment", "when"]
  },

  // Account & Orders
  {
    id: "7",
    question: "How do I create an account?",
    answer: "Click the 'Sign Up' button in the top right corner of our website. Enter your email, create a password, and fill in your details. You'll receive a confirmation email to verify your account.",
    category: "Account",
    keywords: ["create", "account", "sign up", "register", "new", "join"]
  },
  {
    id: "8",
    question: "I forgot my password. How do I reset it?",
    answer: "Click 'Forgot Password' on the login page. Enter your email address and we'll send you a password reset link. The link expires in 24 hours for security.",
    category: "Account",
    keywords: ["forgot", "password", "reset", "login", "access", "cant", "remember"]
  },
  {
    id: "9",
    question: "How do I change my account information?",
    answer: "Log into your account and go to 'Account Settings'. From there, you can update your name, email, password, shipping address, and payment methods.",
    category: "Account",
    keywords: ["change", "update", "account", "information", "details", "edit", "modify"]
  },

  // Products
  {
    id: "10",
    question: "Are your products eco-friendly?",
    answer: "Yes! We're committed to sustainability. Our products are made from recycled materials where possible, and our packaging is 100% recyclable and plastic-free.",
    category: "Products",
    keywords: ["eco", "friendly", "sustainable", "environment", "green", "recycle", "packaging"]
  },
  {
    id: "11",
    question: "What sizes do you offer?",
    answer: "We offer sizes XS through 3XL for most items. Check our size guide on each product page for detailed measurements. If you're between sizes, we recommend sizing up for a comfortable fit.",
    category: "Products",
    keywords: ["size", "sizes", "small", "large", "medium", "fit", "measurements"]
  },
  {
    id: "12",
    question: "Do you have a warranty?",
    answer: "Yes, all our products come with a 1-year warranty against manufacturing defects. If you experience any issues, contact our support team with your order number and photos of the defect.",
    category: "Products",
    keywords: ["warranty", "guarantee", "defect", "broken", "damaged", "quality"]
  },

  // Payment
  {
    id: "13",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. We also offer Buy Now, Pay Later options through Klarna and Afterpay.",
    category: "Payment",
    keywords: ["payment", "pay", "credit", "card", "paypal", "methods", "accept"]
  },
  {
    id: "14",
    question: "Is my payment information secure?",
    answer: "Absolutely! We use industry-standard SSL encryption to protect your data. We're PCI-DSS compliant and never store your full credit card details on our servers.",
    category: "Payment",
    keywords: ["secure", "security", "safe", "payment", "information", "privacy", "protect"]
  },

  // Contact & Support
  {
    id: "15",
    question: "How can I contact customer support?",
    answer: "You can reach us via: Email: support@example.com (24-48hr response), Live Chat: Available Mon-Fri 9am-6pm EST, Phone: 1-800-EXAMPLE (Mon-Fri 9am-6pm EST).",
    category: "Support",
    keywords: ["contact", "support", "help", "email", "phone", "chat", "reach", "customer service"]
  }
];

export const categories = [...new Set(faqData.map(faq => faq.category))];
