export interface Message {
  id: string;
  message: string;
  role: "user" | "assistant";
  created_at: string;
}

export interface OpenAIMessage {
  role: "user" | "assistant";
  content: string;
}

export async function callOpenAI(
  messages: OpenAIMessage[]
): Promise<string> {
  const response = await fetch("https://ai-bot-n7f5.onrender.com/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("Failed to get AI response");
  }

  const data = await response.json();
  return data.reply;
}