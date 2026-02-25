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
  const response = await fetch("http://localhost:3001/api/chat", {
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