import { Message } from '../lib/openai';

interface MessageBubbleProps {
  message: Message;
}

/**
 * MessageBubble displays individual chat messages with role-based styling
 * User messages appear on the right with blue background
 * Assistant messages appear on the left with gray background
 */
export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-700 text-gray-100 rounded-bl-none'
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{message.message}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
