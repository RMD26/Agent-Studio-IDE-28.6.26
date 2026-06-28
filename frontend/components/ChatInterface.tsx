import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-vscode-bg">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-purple-600' : 
              msg.role === 'system' ? 'bg-slate-700' : 'bg-indigo-600'
            }`}>
              {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
            </div>
            <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-sm font-medium text-vscode-text">
                  {msg.role === 'user' ? 'You' : msg.agentName || 'System'}
                </span>
                <span className="text-xs text-vscode-muted">{msg.timestamp}</span>
              </div>
              <div className={`p-3 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 
                'bg-vscode-panel text-vscode-text border border-vscode-border rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-vscode-border bg-vscode-bg shrink-0">
        <div className="relative flex items-end gap-2 bg-vscode-panel border border-vscode-border rounded-lg p-2 focus-within:border-vscode-accent transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter an instruction for the orchestrator... (e.g., 'Create a login page')"
            className="w-full bg-transparent text-vscode-text placeholder-vscode-muted resize-none outline-none max-h-32 min-h-[40px] text-sm py-1"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded transition-colors shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
