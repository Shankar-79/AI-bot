import { Send } from 'lucide-react';
import { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

/**
 * ChatInput provides a text input field and send button for the chatbot
 * Handles form submission and prevents sending empty messages
 * Input is disabled while waiting for AI response
 */
export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent sending empty messages or whitespace-only messages
    if (!input.trim()) {
      return;
    }

    onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="flex-1 px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        rows={1}
        onKeyDown={(e) => {
          // Send on Enter, but allow Shift+Enter for new line
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
      >
        <Send size={20} />
      </button>
    </form>
  );
}
