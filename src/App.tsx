import { useEffect, useState } from "react";
import { ChatWindow } from "./components/ChatWindow";
import { ChatInput } from "./components/ChatInput";
import { db } from "./lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { callOpenAI, Message, OpenAIMessage } from "./lib/openai";
import { MessageCircle } from "lucide-react";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(
        collection(db, "conversations"),
        orderBy("created_at")
      );
      const snapshot = await getDocs(q);

      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      }));

      setMessages(msgs);
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async (userMessage: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const userDoc = await addDoc(collection(db, "conversations"), {
        message: userMessage,
        role: "user",
        created_at: new Date(),
      });

      const newUserMessage: Message = {
        id: userDoc.id,
        message: userMessage,
        role: "user",
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newUserMessage]);

      const conversationHistory: OpenAIMessage[] = [
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.message,
        })),
        { role: "user", content: userMessage },
      ];

      const aiResponse = await callOpenAI(conversationHistory);

      const aiDoc = await addDoc(collection(db, "conversations"), {
        message: aiResponse,
        role: "assistant",
        created_at: new Date(),
      });

      const newAIMessage: Message = {
        id: aiDoc.id,
        message: aiResponse,
        role: "assistant",
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newAIMessage]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <MessageCircle size={28} className="text-blue-500" />
          <h1 className="text-2xl font-bold">AI Chatbot</h1>
        </div>
      </header>

      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        error={error}
      />

      <footer className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </footer>
    </div>
  );
}

export default App;