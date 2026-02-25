import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { Message } from '../lib/openai';
import { Loader } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

/**
 * ChatWindow displays the conversation history with auto-scroll to bottom
 * Shows loading spinner while waiting for AI response
 * Displays error messages if API calls fail
 */
export function ChatWindow({ messages, isLoading, error }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-200 mb-2">AI Chatbot</h2>
            <p className="text-gray-400">Start a conversation by typing a message below</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-700 text-gray-100 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader size={16} className="animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg">
              <p className="text-sm font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
