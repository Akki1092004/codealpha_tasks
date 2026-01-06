import { Chatbot } from "@/components/chat/Chatbot";

const Index = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          FAQ Chatbot
        </h1>
        <p className="mt-2 text-muted-foreground">
          Powered by NLP-based question matching
        </p>
      </div>
      <Chatbot />
    </main>
  );
};

export default Index;
